import * as fs from "fs";
const write = fs.createWriteStream("output.txt", {
  highWaterMark: 1024, // 1 KB
});

function writeMany() {
  let ok = true;
  for (let i = 0; i < 1e6; i++) {
    ok = write.write("data data data\n");
    if (!ok) {
      console.log("Buffer full! Waiting for drain...");
      write.once("drain", writeMany);
      return;
    }
  }
}

writeMany();
