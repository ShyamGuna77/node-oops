

import { createWriteStream } from "fs";
import { BIG_FILE_PATH } from "./constants.js";

export async function generateBigFile() {
  const ws = createWriteStream(BIG_FILE_PATH, { flags: "w" });

  console.log("Generating 2GB file...");

  for (let i = 0; i < 20; i++) {
    ws.write("hello world".repeat(1e7));
  }

  ws.end();

  return new Promise<void>((resolve) => ws.on("finish", () => resolve()));
}
