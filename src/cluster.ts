import cluster from "cluster";
import os from "os";
if (cluster.isPrimary) {
  console.log(`Master process ${process.pid} is running`);

  const cpuCount = os.cpus().length;

  console.log(`Spawning ${cpuCount} workers...`);

  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }

  // Listen for workers exiting
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);

    // Automatically restart the worker
    console.log("Starting a new worker...");
    cluster.fork();
  });

  // Receive messages from workers
  cluster.on("message", (worker, msg) => {
    console.log(`Message from worker ${worker.process.pid}:`, msg);
  });
} else {
  
  const { default: app } = await import(
    new URL("./server.ts", import.meta.url).href
  );

  // Each worker listens on the same port
  app.listen(3000, () => {
    console.log(`Worker ${process.pid} started and listening on port 3000`);
  });
}
