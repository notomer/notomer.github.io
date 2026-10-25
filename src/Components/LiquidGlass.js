import React, { useEffect, useId, useRef, useState } from "react";

// Convex squircle bezel and Snell refraction, following:
// https://kube.io/blog/liquid-glass-css-svg/
// The glass is a slab of `thickness` px whose rim is a convex squircle over a
// `bezel`-wide band; the rounded rectangle is a circle with its flat middle
// extended.
const REFRACTIVE_INDEX = 1.5; // glass in air
// Fixed light direction, roughly top-left and toward the viewer, matching the
// Apple-style rim light where the highlight brightness follows how the surface
// normal tilts toward the light.
const LIGHT = (() => {
  const raw = [-.5, -.85, .55];
  const length = Math.hypot(...raw);
  return [raw[0] / length, raw[1] / length, raw[2] / length];
})();

export function refractionField(width, height, radius, options = {}) {
  const refractiveIndex = options.refractiveIndex ?? REFRACTIVE_INDEX;
  // Physical surface knobs: width of the curved rim and glass height of the
  // flat core, in px.
  const bezel = options.bezel ?? Math.min(Math.max(radius * .75, 8), 26);
  const thickness = options.thickness ?? Math.min(Math.min(width, height) * .3, 26);

  const pixels = new Uint8ClampedArray(width * height * 4);
  const specular = new Uint8ClampedArray(width * height * 4);
  const vectors = new Float32Array(width * height * 2);
  let maximum = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const px = x + .5 - width / 2;
      const py = y + .5 - height / 2;
      const qx = Math.abs(px) - (width / 2 - radius);
      const qy = Math.abs(py) - (height / 2 - radius);
      const dx = Math.max(qx, 0), dy = Math.max(qy, 0);
      const length = Math.hypot(dx, dy);
      // Inside distance along the rounded-rectangle wall (exact near the wall).
      const distance = radius - length - Math.min(Math.max(qx, qy), 0);
      const i = (y * width + x) * 2;
      const p = (y * width + x) * 4;
      if (distance > 0 && distance < bezel) {
        // Article's convex squircle surface height, x: 0 at the outer edge,
        // 1 at the end of the bezel.
        const u = 1 - distance / bezel;
        const profile = Math.pow(1 - u ** 4, .25);
        // Surface slope in physical units: the height rises by `thickness`
        // over a run of `bezel`, scaled by the profile's normalized derivative.
        const slope = (thickness / bezel) * u ** 3 / Math.pow(1 - u ** 4, .75);
        const incidence = Math.atan(slope);
        const refracted = Math.asin(Math.sin(incidence) / refractiveIndex);
        // Glass height at this point times the emergent ray's tilt from
        // vertical; zero at both the knife edge and the flat core.
        const displacement = thickness * profile * Math.tan(incidence - refracted);
        const nx = length ? dx / length : (qx > qy ? 1 : 0);
        const ny = length ? dy / length : (qy >= qx ? 1 : 0);
        // Sample toward the rim: background compresses inward at the bezel.
        vectors[i] = Math.sign(px) * nx * displacement;
        vectors[i + 1] = Math.sign(py) * ny * displacement;
        maximum = Math.max(maximum, displacement);
        // Specular rim light: the surface normal tilts outward as the height
        // rises; its angle against the fixed light sets the highlight.
        const ox = Math.sign(px) * nx, oy = Math.sign(py) * ny;
        const normal = Math.hypot(slope, 1);
        const facing = LIGHT[2] + slope * (LIGHT[0] * ox + LIGHT[1] * oy);
        const highlight = Math.round(Math.pow(Math.max(facing / normal, 0), 10) * profile * 255);
        pixels[p + 2] = highlight;
        // Overlay copy: white whose alpha carries the highlight, so plain
        // compositing brightens the rim only (blend modes are unreliable
        // across backdrop-filtered groups).
        specular[p] = 255;
        specular[p + 1] = 255;
        specular[p + 2] = 255;
        specular[p + 3] = highlight;
      }
    }
  }
  for (let i = 0; i < width * height; i++) {
    pixels[i * 4] = 128 + (vectors[i * 2] / (maximum || 1)) * 127;
    pixels[i * 4 + 1] = 128 + (vectors[i * 2 + 1] / (maximum || 1)) * 127;
    // Blue keeps the specular intensity computed above (zero outside the bezel).
    pixels[i * 4 + 3] = 255;
  }
  // SVG channel values cover -0.5 to +0.5, hence twice the maximum shift.
  return { pixels, specular, scale: maximum * 2 };
}

export default function LiquidGlass() {
  const surface = useRef(null);
  const id = `glass-${useId().replace(/:/g, "")}`;
  const [map, setMap] = useState(null);
  useEffect(() => {
    // CSS.supports accepts URL syntax even in engines without backdrop SVG support.
    const chromium = /Chrome|Chromium|Edg\//.test(navigator.userAgent);
    if (!chromium || !window.ResizeObserver) return undefined;
    let resizeFrame;
    let previousSize = "";
    const update = () => {
      const width = Math.round(surface.current.clientWidth);
      const height = Math.round(surface.current.clientHeight);
      const radius = Math.min(parseFloat(getComputedStyle(surface.current).borderTopLeftRadius) || 0, width / 2, height / 2);
      const size = `${width}:${height}:${radius}`;
      if (!width || !height || size === previousSize) return;
      previousSize = size;
      const { pixels, specular, scale } = refractionField(width, height, radius);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      if (!context) return;
      const data = context.createImageData(width, height);
      data.data.set(pixels);
      context.putImageData(data, 0, 0);
      // The specular highlight rides as its own grayscale overlay instead of a
      // second pair of filter prims: Chromium's backdrop-filter chain renders
      // those dark (see tests), while displacement alone stays correct.
      const specularCanvas = document.createElement("canvas");
      specularCanvas.width = width;
      specularCanvas.height = height;
      const specularContext = specularCanvas.getContext("2d");
      if (!specularContext) return;
      const specularData = specularContext.createImageData(width, height);
      specularData.data.set(specular);
      specularContext.putImageData(specularData, 0, 0);
      setMap({ width, height, scale, url: canvas.toDataURL(), specularUrl: specularCanvas.toDataURL() });
    };
    const observer = new ResizeObserver(() => {
      // Match the actual animated geometry; stretching a stale circular map
      // across the expanded capsule produces the wrong normals and clipping.
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(update);
    });
    observer.observe(surface.current);
    return () => { observer.disconnect(); cancelAnimationFrame(resizeFrame); };
  }, []);

  return <>
    <svg className="glass-filter-defs" aria-hidden="true" focusable="false">
      <defs>{map && <filter id={id} x="0" y="0" width={map.width} height={map.height} filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feImage href={map.url} x="0" y="0" width={map.width} height={map.height} preserveAspectRatio="none" result="refraction-map" />
        <feDisplacementMap in="SourceGraphic" in2="refraction-map" scale={map.scale} xChannelSelector="R" yChannelSelector="G" />
      </filter>}</defs>
    </svg>
    <span ref={surface} aria-hidden="true" className={`liquid-glass-surface${map ? " has-refraction" : ""}`} style={map ? { "--glass-filter": `url(#${id})` } : undefined} />
    {/* The highlight must be a sibling: inside a backdrop-filtered element a
        child's screen blend can only see the group's own content and paints
        the dark shoulder of the map instead of blending bright. */}
    {map && <span className="glass-specular" aria-hidden="true" style={{ backgroundImage: `url(${map.specularUrl})` }} />}
  </>;
}
