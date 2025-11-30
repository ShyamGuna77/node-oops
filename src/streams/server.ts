

import { request } from "http";
import { createReadStream } from "fs";
import { createGzip } from "zlib";
import { basename } from "path";

const filePath = process.argv[2]; // File to send
const serverHost = process.argv[3]; // Server address like "localhost"

if (!filePath || !serverHost) {
  console.error("Usage: ts-node gzip-send.ts <filePath> <serverHost>");
  process.exit(1);
}

const fileName = basename(filePath);

const options = {
  hostname: serverHost,
  port: 3000,
  path: "/",
  method: "PUT",
  headers: {
    "Content-Type": "application/octet-stream",
    "Content-Encoding": "gzip",
    "X-Filename": fileName,
  },
};

console.log(`📤 Sending file: ${fileName}`);

const req = request(options, (res) => {
  console.log(`📨 Server responded with status: ${res.statusCode}`);
});

createReadStream(filePath)
  .pipe(createGzip())
  .pipe(req)
  .on("finish", () => {
    console.log("✅ File successfully sent to server");
  })
  .on("error", (err) => {
    console.error("❌ Stream error:", err);
  });
