

import { Readable } from "stream";
import { randomUUID } from "crypto";
import type { Person } from "./types.ts";

export class PersonReadable extends Readable {
  private index = 0;
  private max = 1_000_000;

  constructor() {
    super({ objectMode: true });
  }

  override _read() {
    while (this.index < this.max) {
      const person: Person = {
        id: randomUUID(),
        name: `User-${this.index}`,
      };

      const shouldContinue = this.push(person);

      this.index++;

      if (!shouldContinue) return; // backpressure safe
    }

    this.push(null);
  }
}
