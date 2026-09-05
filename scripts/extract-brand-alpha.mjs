import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const source = path.join(root, "public", "brand", "pitagoricos-white-on-dark-original.png");
const output = path.join(root, "public", "brand", "pitagoricos-white-transparent.png");
const background = [2, 28, 77];
const noiseFloor = 0.06;

const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
let transparentPixels = 0;
let visiblePixels = 0;

for (let index = 0; index < data.length; index += 4) {
  const sourceChannels = [data[index], data[index + 1], data[index + 2]];
  const alphaEstimate = Math.max(
    ...sourceChannels.map((channel, channelIndex) =>
      Math.max(0, (channel - background[channelIndex]) / (255 - background[channelIndex])),
    ),
  );

  if (alphaEstimate <= noiseFloor) {
    data[index] = 0;
    data[index + 1] = 0;
    data[index + 2] = 0;
    data[index + 3] = 0;
    transparentPixels += 1;
    continue;
  }

  const alpha = Math.min(1, alphaEstimate);
  for (let channelIndex = 0; channelIndex < 3; channelIndex += 1) {
    const unblended = (sourceChannels[channelIndex] - background[channelIndex] * (1 - alpha)) / alpha;
    data[index + channelIndex] = Math.round(Math.max(0, Math.min(255, unblended)));
  }
  data[index + 3] = Math.round(alpha * 255);
  visiblePixels += 1;
}

await sharp(data, { raw: info }).png().toFile(output);
const digest = createHash("sha256").update(await readFile(output)).digest("hex").toUpperCase();
console.log(JSON.stringify({ output, width: info.width, height: info.height, transparentPixels, visiblePixels, sha256: digest }, null, 2));
