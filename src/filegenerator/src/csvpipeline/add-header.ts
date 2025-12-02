

import { Transform, } from "stream";
import type { TransformCallback } from "stream";

export class AddHeader extends Transform {
  private headerAdded = false;

  constructor() {
    super();
  }

  override _transform(chunk: any, _: BufferEncoding, cb: TransformCallback) {
    if (!this.headerAdded) {
      this.headerAdded = true;
      return cb(null, "id,name\n" + chunk);
    }
    cb(null, chunk);
  }
}
