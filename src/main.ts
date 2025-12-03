// main.ts
import {
  Worker,
  isMainThread,
  parentPort,
  MessageChannel,
} from "worker_threads";
import { fileURLToPath } from "url";
import { dirname } from "path";

if (!isMainThread) throw new Error("This file should be run as main");

// Compute __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  console.log("Main thread starting");

  // create worker and pass initial data
  // Use a file URL and run the worker as an ES module so imports resolve correctly
  const worker = new Worker(new URL("./worker.ts", import.meta.url), {
    workerData: { start: 1, count: 5 },
    // small resource limit example (MB)
    resourceLimits: { maxOldGenerationSizeMb: 64 },
  });

  worker.on("online", () => console.log("Worker is online"));
  worker.on("message", (msg) => console.log("Main received message:", msg));
  worker.on("error", (err) => console.error("Worker error:", err));
  worker.on("exit", (code) => console.log("Worker exited with", code));

  // Post a message
  worker.postMessage({ cmd: "doWork", payload: "Hello from main" });

  // Transfer an ArrayBuffer zero-copy
  const buf = new Uint8Array(1024 * 1024); // 1MB
  for (let i = 0; i < buf.length; i++) buf[i] = i % 256;

  // Transfer ownership of the underlying ArrayBuffer to the worker
  worker.postMessage({ cmd: "processBuffer", buffer: buf.buffer }, [
    buf.buffer,
  ]);

  // MessageChannel example - create a dedicated channel and send port2 to worker
  const { port1, port2 } = new MessageChannel();
  port1.on("message", (m) => console.log("port1 got:", m));
  worker.postMessage({ cmd: "usePort", port: port2 }, [port2]);

  // Terminate after some time
  setTimeout(async () => {
    console.log("Terminating worker");
    await worker.terminate();
    console.log("Worker terminated");
  }, 5_000);
}

main().catch(console.error);
