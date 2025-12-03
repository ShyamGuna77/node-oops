import { generateBigFile } from "./bigfile/generate.js";
import { readBigFile } from "./bigfile/read-stream.js";
import { createCsv } from "./csvpipeline/create-csv.js";

async function main() {
  // PART 1
  await generateBigFile();
  await readBigFile();

  // PART 2
  await createCsv();
}

main().catch((err) => console.error(err));
