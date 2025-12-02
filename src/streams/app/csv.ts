// for i in `seq 1 20`; do node -e "process.stdout.write('hello world'.repeat(1e7))" >> big.file; done

import { promises, createReadStream, statSync } from "node:fs";
const filename = "./src/streams/app/big.file";

try {
  const file = await promises.readFile(filename);
  console.log("file size", file.byteLength / 1e9, "GB", "\n");
  console.log("fileBuffer", file);
} catch (error) {
  console.log("error reading file:", (error as Error).message);
}

let size: number | null = null;
try {
  const stat = statSync(filename);
  size = stat.size;
  console.log("file size", size / 1e9, "GB", "\n");
} catch (err) {
  console.log("file not found, skipping stream read: ", (err as Error).message);
}

let chunkConsumed = 0;
if (size !== null) {
  const stream = createReadStream(filename)
    // 65K per readable!
    // triggered by the first stream.read
    .once("data", (msg: string | Buffer) => {
      console.log(
        "on data length",
        typeof msg === "string" ? msg.length : msg.toString().length
      );
    })
    .once("readable", () => {
      // this stream.read(11) will trigger the on(data) event
      const a = stream.read(11);
      if (a) console.log("read 11 chunk bytes", String(a).slice(0, 11));
      const b = stream.read(5);
      if (b) console.log("read 05 chunk bytes", String(b).slice(0, 5));

      chunkConsumed += 11 + 5;
    })
    .on("readable", () => {
      let chunk: Buffer | null;
      // stream.read() reads max 65Kbytes
      while (null !== (chunk = stream.read())) {
        chunkConsumed += (chunk as Buffer).length;
      }
    })
    .on("end", () => {
      console.log(`Read ${chunkConsumed / 1e9} bytes of data...`);
    });
} else {
  console.log(
    "No file to stream; create 'big.file' in the project root to test streaming."
  );
}
