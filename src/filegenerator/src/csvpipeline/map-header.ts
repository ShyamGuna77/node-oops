

import { Transform, } from "stream";
import type { TransformCallback } from "stream";
import type { Person } from "./types.ts";

export class MapFields extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  override _transform(chunk: Person, _: BufferEncoding, cb: TransformCallback) {
    const result = `${chunk.id},${chunk.name.toUpperCase()}\n`;
    cb(null, result);
  }
}
