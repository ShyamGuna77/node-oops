// worker.ts
import { parentPort, workerData } from "worker_threads";

console.log("Worker started with data:", workerData);

if (!parentPort) {
  throw new Error("worker must be run as a worker");
}

parentPort.on("message", (msg) => {
  const { cmd } = msg;
  switch (cmd) {
    case "doWork":
      // simulate CPU work
      parentPort!.postMessage({ result: `Received: ${msg.payload}` });
      break;

    case "processBuffer":
      // msg.buffer was transferred (ArrayBuffer neutered in main)
      // validate buffer before processing
      if (!(msg && msg.buffer instanceof ArrayBuffer)) {
        parentPort!.postMessage({ error: "buffer is missing or invalid" });
        break;
      }
      // create a view and do something
      const arr = new Uint8Array(msg.buffer as ArrayBuffer);
      // quick checksum
      let sum = 0;
      for (const v of arr) sum = (sum + v) >>> 0;
      parentPort!.postMessage({ checksum: sum });
      break;

    case "usePort":
      {
        // msg.port is a MessagePort transferred into this worker
        const port = msg.port;
        port.on("message", (m: any) => {
          // echo back
          port.postMessage({ echo: m });
        });
        // send a test message
        port.postMessage({ hello: "port from worker" });
      }
      break;

    default:
      parentPort!.postMessage({ error: "unknown cmd" });
  }
});
