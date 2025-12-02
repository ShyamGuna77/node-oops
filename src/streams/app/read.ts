import { Readable, Writable, Transform } from "node:stream";
import { randomUUID } from "node:crypto";

import { createWriteStream } from "node:fs";
// data source: file, database, website, anything you can consume on demand!
const readable = new Readable({
  read() {
    //  1.000.000
    for (let index = 0; index < 1e6; index++) {
      const person = {
        id: randomUUID(),
        name: `Erick-${index}`,
      };
      const data = JSON.stringify(person);
      // push newline-delimited JSON so downstream transforms can split safely
      this.push(data + "\n");
    }
    // notify that the data is empty (consumed everything)
    this.push(null);
  },
});

const mapFields = new Transform({
  transform(chunk, enc, cb) {
    // ensure we parse a string
    const str = Buffer.isBuffer(chunk) ? chunk.toString("utf8") : String(chunk);
    // trim to remove trailing newlines
    const trimmed = str.trim();
    if (!trimmed) return cb();

    let data;
    try {
      data = JSON.parse(trimmed);
    } catch (err) {
      return cb(err as Error);
    }

    const result = `${data.id},${String(data.name).toUpperCase()}\n`;
    cb(null, result);
  },
});

class HeaderTransform extends Transform {
  private _counter: number = 0;

  _transform(
    chunk: any,
    enc: BufferEncoding,
    cb: (error?: Error | null, data?: any) => void
  ) {
    if (this._counter) {
      return cb(null, chunk);
    }
    this._counter += 1;
    cb(null, "id,name\n".concat(String(chunk)));
  }
}

const mapHeaders = new HeaderTransform();

const writeStream = createWriteStream("my.csv");

const pipeline = readable.pipe(mapFields).pipe(mapHeaders).pipe(writeStream);

writeStream.on("finish", () => console.log("task finished..."));

