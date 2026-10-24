import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";

// Reuse the image processor shipped with the pinned Next.js dependency.
const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");
const root = new URL("../", import.meta.url);
const mark = await readFile(new URL("public/icons/mosaic-mark.svg", root), "utf8");
const background = "#171c2b";

// The mark stays within the central mask-safe circle, including its rotation.
const appIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="${background}"/>
  <svg x="92" y="92" width="328" height="328" viewBox="-3 -3 38 38">${mark.match(/<g[\s\S]*<\/g>/)[0]}</svg>
</svg>`;
await writeFile(new URL("public/icons/mosaic-app.svg", root), appIcon);
for (const size of [180, 192, 512]) {
  await sharp(Buffer.from(appIcon)).resize(size, size).png()
    .toFile(new URL(`public/icons/mosaic-${size}.png`, root).pathname);
}

// PNG-backed ICO frames keep legacy tab icons aligned with the vector mark.
const frames = await Promise.all([16, 32, 48].map(async (size) => ({
  size, bytes: await sharp(Buffer.from(mark)).resize(size, size).png().toBuffer(),
})));
const header = Buffer.alloc(6 + frames.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(frames.length, 4);
let offset = header.length;
frames.forEach(({ size, bytes }, index) => {
  const entry = 6 + index * 16;
  header[entry] = size;
  header[entry + 1] = size;
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(bytes.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += bytes.length;
});
await writeFile(new URL("public/favicon.ico", root), Buffer.concat([header, ...frames.map(({ bytes }) => bytes)]));
