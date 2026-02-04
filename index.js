import express from "express";
import { runOrchestrator } from "./orchestrator.js";
// Retry Build 001

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "ssm-orchestrator",
    timestamp: new Date().toISOString()
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "ssm-orchestrator",
    timestamp: new Date().toISOString()
  });
});

app.post("/run", async (req, res) => {
  console.log("RUN invoked", {
    source: req.body?.source || "unknown",
    timestamp: new Date().toISOString()
  });

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Transfer-Encoding", "chunked");

  // immediate write keeps Cloud Run alive
  res.write(JSON.stringify({ status: "started" }) + "\n");

  // heartbeat prevents idle shutdown
  const heartbeat = setInterval(() => {
    try {
      res.write(
        JSON.stringify({ status: "working", ts: Date.now() }) + "\n"
      );
    } catch (_) {}
  }, 8000);

  try {
    const result = await runOrchestrator(req.body);

    clearInterval(heartbeat);
    res.write(JSON.stringify({ status: "complete", result }) + "\n");
    res.end();
  } catch (err) {
    clearInterval(heartbeat);
    console.error("Orchestrator error", err);
    res.write(
      JSON.stringify({ status: "error", message: err.message }) + "\n"
    );
    res.end();
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
