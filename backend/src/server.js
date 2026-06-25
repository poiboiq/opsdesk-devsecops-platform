require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const client = require("prom-client");

const connectDB = require("./config/db");
const healthRoutes = require("./routes/health.routes");
const incidentRoutes = require("./routes/incident.routes");
const { notFoundHandler, errorHandler } = require("./middleware/error.middleware");

const app = express();
const port = process.env.PORT || 5000;

client.collectDefaultMetrics();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));

app.use("/health", healthRoutes);
app.use("/api/incidents", incidentRoutes);

app.get("/metrics", async (req, res, next) => {
  try {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
  } catch (error) {
    next(error);
  }
});

app.use(notFoundHandler);
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`OpsDesk backend running on port ${port}`);
});

connectDB();

const shutdown = () => {
  console.log("Shutdown signal received");
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
