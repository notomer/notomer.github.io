import React, { useEffect, useRef, useState } from "react";
import LiquidGlass from "./LiquidGlass";

// Original implementation of the segmented-page, spine-pivot approach shown in
// https://github.com/AD757/3D-Book-threejs (no demo assets or source copied).
export default function BookPreview({ book, onClose }) {
  const host = useRef(null);
  const target = useRef(true);
  const [opened, setOpened] = useState(true);
  const [ready, setReady] = useState(false);
  useEffect(() => { target.current = opened; }, [opened]);

  useEffect(() => {
    if (!window.WebGLRenderingContext) return undefined;
    let disposed = false, frame, renderer, observer;
    const resources = [];
    const container = host.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    import('three').then((THREE) => {
      if (disposed) return;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      } catch { return; }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      container.appendChild(renderer.domElement);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, .1, 30);
      camera.position.set(0, 0, 5.8);
      scene.add(new THREE.AmbientLight(0xffffff, 2));
      const light = new THREE.DirectionalLight(0xffffff, 3);
      light.position.set(-3, 4, 6);
      scene.add(light);
      const group = new THREE.Group();
      group.rotation.set(-.12, -.12, -.035);
      scene.add(group);
      const own = (resource) => { resources.push(resource); return resource; };
      const paper = own(new THREE.MeshStandardMaterial({ color: '#f3ecd9', roughness: .9 }));
      const binding = own(new THREE.MeshStandardMaterial({ color: '#454039', roughness: .65 }));
      const pageTexture = (title, copy) => {
        const canvas = document.createElement('canvas');
        canvas.width = 768; canvas.height = 1080;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#f3ecd9'; ctx.fillRect(0, 0, 768, 1080);
        ctx.fillStyle = '#302c27';
        let y = 140;
        const write = (text, font, lineHeight) => {
          ctx.font = font;
          let line = '';
          text.split(/\s+/).forEach((word) => {
            const next = line ? `${line} ${word}` : word;
            if (ctx.measureText(next).width > 600 && line) {
              ctx.fillText(line, 84, y); y += lineHeight; line = word;
            } else line = next;
          });
          ctx.fillText(line, 84, y); y += lineHeight;
        };
        write(title, '64px Georgia', 78);
        y += 50;
        write(copy, '54px Georgia', 70);
        const texture = own(new THREE.CanvasTexture(canvas));
        texture.colorSpace = THREE.SRGBColorSpace;
        return own(new THREE.MeshStandardMaterial({ map: texture, roughness: .9 }));
      };
      const titlePage = pageTexture(book.title, book.author);
      const summaryPage = pageTexture('On my shelf', book.summary);
      const block = new THREE.Mesh(own(new THREE.BoxGeometry(1.24, 1.76, .09)), [paper, paper, paper, paper, summaryPage, paper]);
      block.position.set(.62, 0, -.08);
      group.add(block);
      const back = new THREE.Mesh(own(new THREE.BoxGeometry(1.3, 1.82, .025)), binding);
      back.position.set(.65, 0, -.145);
      group.add(back);
      const coverGeometry = own(new THREE.BoxGeometry(1.3, 1.82, .025));
      coverGeometry.translate(.65, 0, 0);
      const front = own(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: .55 }));
      const cover = new THREE.Mesh(coverGeometry, [binding, binding, binding, binding, front, paper]);
      cover.position.z = .015;
      group.add(cover);
      // A few stacked sheets give the flipped page real thickness instead of
      // reading as one floating paper sliver; the top sheet carries the text.
      const pages = [0, 1, 2].map((index) => {
        const geometry = own(new THREE.BoxGeometry(1.23, 1.74, .004, 24, 1));
        geometry.translate(.615, 0, 0);
        const original = geometry.attributes.position.array.slice();
        const mesh = new THREE.Mesh(geometry, [paper, paper, paper, paper, paper, index === 0 ? titlePage : paper]);
        mesh.position.z = -.015 - index * .008;
        group.add(mesh);
        return { mesh, original, index };
      });
      // Soft contact shadow behind the book grounds it against the backdrop.
      const shadowCanvas = document.createElement('canvas');
      shadowCanvas.width = 128; shadowCanvas.height = 128;
      const shadowCtx = shadowCanvas.getContext('2d');
      const shadowGradient = shadowCtx.createRadialGradient(64, 64, 6, 64, 64, 62);
      shadowGradient.addColorStop(0, 'rgba(30, 24, 16, .28)');
      shadowGradient.addColorStop(.6, 'rgba(30, 24, 16, .12)');
      shadowGradient.addColorStop(1, 'rgba(30, 24, 16, 0)');
      shadowCtx.fillStyle = shadowGradient;
      shadowCtx.fillRect(0, 0, 128, 128);
      const shadowTexture = own(new THREE.CanvasTexture(shadowCanvas));
      const shadow = own(new THREE.Mesh(
        new THREE.PlaneGeometry(3.2, 2.6),
        new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, depthWrite: false })
      ));
      shadow.position.set(.65, -.3, -.5);
      group.add(shadow);
      let progress = reducedMotion ? 1 : 0;
      let last = performance.now();
      let start = last;
      let textureReady = false;
      let needsRender = true;
      const resize = () => {
        const width = container.clientWidth, height = container.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        // Framing leaves a margin around the whole book (spread is 2.46 wide).
        camera.position.z = Math.max(1.12, 2 / camera.aspect) / Math.tan(THREE.MathUtils.degToRad(17.5));
        camera.updateProjectionMatrix();
        needsRender = true;
      };
      observer = new ResizeObserver(resize);
      observer.observe(container);
      resize();
      new THREE.TextureLoader().load(book.image, (texture) => {
        if (disposed) { texture.dispose(); return; }
        own(texture);
        texture.colorSpace = THREE.SRGBColorSpace;
        if (book.coverFrame) {
          texture.repeat.set(1044 / 1539, 1655 / 2153);
          texture.offset.set(244 / 1539, 1 - (253 + 1655) / 2153);
        }
        front.map = texture;
        front.needsUpdate = true;
        textureReady = true;
        needsRender = true;
        start = performance.now();
        setReady(true);
      }, undefined, () => { if (!disposed) { textureReady = true; setReady(true); } });
      const tick = (now) => {
        if (disposed) return;
        const delta = Math.min((now - last) / 1000, .05);
        last = now;
        const destination = textureReady && now - start > 300 && target.current ? 1 : 0;
        const previous = progress;
        progress = reducedMotion ? destination : THREE.MathUtils.damp(progress, destination, 5, delta);
        if (!needsRender && Math.abs(progress - previous) < .00001) {
          frame = requestAnimationFrame(tick);
          return;
        }
        needsRender = false;
        cover.rotation.y = -Math.PI * .99 * progress;
        cover.position.z = .015 - .28 * progress;
        group.position.x = -.65 * (1 - progress) + (progress > .5 ? .06 : 0);
        pages.forEach(({ mesh, original, index }) => {
          const turn = THREE.MathUtils.smoothstep(progress, .14 + index * .13, 1);
          mesh.rotation.y = -Math.PI * turn;
          // Keep the stacked offsets when the sheets lift open, or the title
          // face and the blank sheets behind it z-fight and shred the text.
          mesh.position.z = -.015 - index * .008 + progress * .07;
          const positions = mesh.geometry.attributes.position;
          for (let i = 0; i < positions.count; i++) {
            const x = original[i * 3];
            positions.setZ(i, original[i * 3 + 2] + Math.sin(x / 1.23 * Math.PI) * Math.sin(turn * Math.PI) * .24);
          }
          positions.needsUpdate = true;
          mesh.geometry.computeVertexNormals();
        });
        // Keep the contact shadow under the book: under the closed block at
        // rest, centred under the hinge of the spread once it opens.
        shadow.position.x = .65 * (1 - progress);
        renderer.render(scene, camera);
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }).catch(() => { /* Keep the cover and accessible details if WebGL is unavailable. */ });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer?.disconnect();
      resources.forEach((resource) => { if (resource.dispose) resource.dispose(); });
      if (renderer) { renderer.dispose(); renderer.domElement.remove(); }
    };
  }, [book]);

  return <>
    <div className="three-book" ref={host} aria-hidden="true">
      {!ready && <img className="three-book-fallback" src={book.image} alt="" />}
    </div>
    <div className={ready ? "book-transcript visually-hidden" : "book-transcript"}>
      <h3 id="book-popover-title">{book.title}</h3>
      <p>{book.author}</p>
      <p>{book.summary}</p>
    </div>
    {ready && (
      <div className="book-viewer-actions">
        <button type="button" className="glass-pill" onClick={() => setOpened((value) => !value)}>
          <LiquidGlass />
          <span className="glass-pill-label">{opened ? 'View cover' : 'Open book'}</span>
        </button>
        <button type="button" className="glass-pill" onClick={onClose}>
          <LiquidGlass />
          <span className="glass-pill-label">Close book</span>
        </button>
      </div>
    )}
  </>;
}
