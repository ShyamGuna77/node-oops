import { createServer, IncomingMessage, ServerResponse } from "http";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import { createGunzip } from "zlib";
import { basename, join } from "path";

const RECEIVED_DIR = "received_files";

// Ensure folder exists
if (!existsSync(RECEIVED_DIR)) {
  mkdirSync(RECEIVED_DIR);
}

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  const rawFilename = req.headers["x-filename"] as string;

  if (!rawFilename) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("Missing X-Filename header\n");
    return;
  }

  const safeFilename = basename(rawFilename); // prevent path traversal
  const destination = join(RECEIVED_DIR, safeFilename);

  console.log(`📥 Receiving file: ${safeFilename}`);

  req
    .pipe(createGunzip())
    .pipe(createWriteStream(destination))
    .on("finish", () => {
      console.log(`✅ File saved: ${destination}`);

      res.writeHead(201, { "Content-Type": "text/plain" });
      res.end("OK\n");
    })
    .on("error", (err) => {
      console.error("❌ Stream error:", err);
      res.writeHead(500);
      res.end("Error\n");
    });
});

server.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
