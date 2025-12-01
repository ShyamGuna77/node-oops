// minimal-duplex.js
import { Duplex } from "stream";

class MinimalDuplex extends Duplex {
  _read(size: any) {
    this.push("readable data");
    this.push(null);
  }
  _write(chunk: any, encoding: any, callback: any) {
    console.log("Received (writable side):", chunk.toString());
    callback();
  }
}

const d = new MinimalDuplex();
d.on("data", (c) => console.log("Read:", c.toString()));
d.write("hello duplex");
d.end();
