import { spawn } from "child_process";

const ping = spawn("ping", ["google.com"]);

ping.stdout.on("data", (data) => {
  console.log("OUTPUT:", data.toString());
});

ping.stderr.on("data", (data) => {
  console.log("ERROR:", data.toString());
});

ping.on("close", (code) => {
  console.log("Process exited with code", code);
});
