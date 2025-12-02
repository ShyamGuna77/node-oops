

import { pipeline } from "stream/promises";
import { createWriteStream } from "fs";
import { PersonReadable } from "./personal-stream.js";
import { MapFields } from "./map-header.js";
import { AddHeader } from "./add-header.js";

export async function createCsv() {
  console.log("Creating CSV...");

  await pipeline(
    new PersonReadable(),
    new MapFields(),
    new AddHeader(),
    createWriteStream("./output/my.csv")
  );

  console.log("CSV generated successfully.");
}
