


import { stat } from "fs/promises";
import { createReadStream as createRS } from "fs";
import { BIG_FILE_PATH } from "./constants.js";

export async function readBigFile() {
  const file = await stat(BIG_FILE_PATH);
  console.log(`File Size: ${(file.size / 1e9).toFixed(2)} GB`);

  const stream = createRS(BIG_FILE_PATH, {
    highWaterMark: 64 * 1024, // 64KB chunks
  });

  let consumed = 0;

  for await (const chunk of stream) {
    consumed += chunk.length;
  }

  console.log(`Stream read: ${(consumed / 1e9).toFixed(2)} GB`);
}
