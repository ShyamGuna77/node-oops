import { Transform, } from "stream";
import type { TransformCallback } from "stream";

class JSONParser extends Transform {
  private leftover: string;

  constructor() {
    // we accept string input but emit JS objects
    super({ readableObjectMode: true });
    this.leftover = "";
  }

  _transform(
    chunk: Buffer | string,
    encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    const str = typeof chunk === "string" ? chunk : chunk.toString(encoding);
    this.leftover += str;
    const lines = this.leftover.split("\n");
    this.leftover = lines.pop() ?? "";

    for (const line of lines) {
      if (line.trim() === "") continue;

      try {
        const obj = JSON.parse(line);
        this.push(obj); // send object forward
      } catch (err) {
        return callback(err as Error);
      }
    }

    callback();
  }

  _flush(callback: TransformCallback): void {
    if ((this.leftover || "").trim() !== "") {
      try {
        const obj = JSON.parse(this.leftover);
        this.push(obj);
      } catch (err) {
        return callback(err as Error);
      }
    }
    callback();
  }
}

// Usage example
const parser = new JSONParser();

parser.on("data", (obj: unknown) => console.log("Parsed object:", obj));

parser.write('{"name":"Alice"}\n');
parser.write('{"name":"Bob"}\n');
parser.end();
