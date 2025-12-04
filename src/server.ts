import express from "express";
const app = express();


app.get("/", (req: express.Request, res: express.Response) => {
  res.send(`Hello from worker ${process.pid}`);
});

// A CPU-heavy endpoint (bad example without worker threads)
app.get("/heavy", (req: express.Request, res: express.Response) => {
  let sum = 0;
  for (let i = 0; i < 5e7; i++) sum += i; // blocks event loop
  res.send(`Calculated sum: ${sum} by worker ${process.pid}`);
});

export default app;
