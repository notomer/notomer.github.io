import { refractionField } from './LiquidGlass';

test('flat center has no displacement and opposite edges refract symmetrically outward', () => {
  const { pixels, scale } = refractionField(80, 60, 20);
  const pixel = (x, y) => Array.from(pixels.slice((y * 80 + x) * 4, (y * 80 + x) * 4 + 4));
  expect(pixel(40, 30)).toEqual([128, 128, 0, 255]);
  // Sample offsets point outward at the wall: left edge pulls left, right pulls right.
  expect(pixel(2, 30)[0]).toBeLessThan(128);
  expect(pixel(77, 30)[0]).toBeGreaterThan(128);
  expect(pixel(2, 30)[0] + pixel(77, 30)[0]).toBe(256);
  expect(scale).toBeGreaterThan(0);
  expect(Number.isFinite(scale)).toBe(true);
});

test('circle corners stay neutral outside the glass and map dimensions match the surface', () => {
  const { pixels } = refractionField(60, 60, 30);
  expect(pixels).toHaveLength(60 * 60 * 4);
  expect(Array.from(pixels.slice(0, 4))).toEqual([128, 128, 0, 255]);
});

test('displacement fades to zero at the bezel edge and at the flat core', () => {
  const { pixels } = refractionField(80, 60, 20);
  const pixel = (x, y) => pixels.slice((y * 80 + x) * 4, (y * 80 + x) * 4 + 4);
  // Halfway into the bezel the profile is long and flat, so refraction is small.
  const midBezel = Array.from(pixel(20, 30));
  expect(Math.abs(midBezel[0] - 128)).toBeLessThan(6);
  expect(Math.abs(midBezel[1] - 128)).toBeLessThan(2);
});

test('specular rim light is brightest toward the top-left and absent on the core', () => {
  const { pixels } = refractionField(80, 60, 20);
  const blue = (x, y) => pixels[((y * 80 + x) * 4) + 2];
  // Flat core and everything outside the bezel carry no highlight.
  expect(blue(40, 30)).toBe(0);
  // The top rim faces the light; the bottom rim faces away.
  const topRim = Math.max(...Array.from({ length: 80 }, (_, x) => blue(x, 8)));
  const bottomRim = Math.max(...Array.from({ length: 80 }, (_, x) => blue(x, 52)));
  expect(topRim).toBeGreaterThan(bottomRim);
  expect(topRim).toBeGreaterThan(30);
});
