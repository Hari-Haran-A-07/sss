import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import connectDB from "./config/db.js";
import { installInMemoryFallback } from "./utils/inMemoryDB.js";

import authRoutes from "./routes/authRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import calendarRoutes from "./routes/calendarRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import backlinkRoutes from "./routes/backlinkRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";

import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware.js";
import { securityHeaders } from "./middleware/securityMiddleware.js";
import { requestLogger } from "./middleware/loggerMiddleware.js";
import { apiLimiter } from "./middleware/rateLimitMiddleware.js";

import { initBullBoard } from "./utils/bullBoard.js";
import { recoverMissedJobs } from "./jobs/recoveryService.js";

// Initialize in-memory fallback engine immediately
installInMemoryFallback();

const app = express();

// Attempt background connection on startup
connectDB().catch((err) =>
  console.warn("Initial DB connect note (fallback available):", err.message)
);

// Middleware: Attempt connection, but if firewalled/unavailable, continue gracefully with in-memory store
app.use(async (req, res, next) => {
  if (req.path === "/" || req.path === "/health" || req.path === "/api/health") {
    return next();
  }

  if (mongoose.connection.readyState < 1) {
    try {
      await connectDB();
    } catch (err) {
      // MongoDB unreachable; in-memory fallback will seamlessly service this request
    }
  }
  next();
});

// Security & Logging Middlewares
app.use(securityHeaders);
app.use(requestLogger);
app.use(cors());
app.use(express.json());

// Rate Limiting on API endpoints
app.use("/api", apiLimiter.middleware());

// Bull Board Queue UI
try {
  const serverAdapter = initBullBoard();
  app.use("/admin/queues", serverAdapter.getRouter());
} catch (err) {
  console.warn("⚠️ Bull Board init skipped:", err.message);
}

// Health check root
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "backend",
    mode: mongoose.connection.readyState >= 1 ? "mongodb" : "in-memory",
  });
});

// Helper to mount routes with given prefix
const mountApiRoutes = (prefix) => {
  app.use(`${prefix}/health`, healthRoutes);
  app.use(`${prefix}/auth`, authRoutes);
  app.use(`${prefix}/brands`, brandRoutes);
  app.use(`${prefix}/calendar`, calendarRoutes);
  app.use(`${prefix}/posts`, postRoutes);
  app.use(`${prefix}/backlinks`, backlinkRoutes);
  app.use(`${prefix}/analytics`, analyticsRoutes);
  app.use(`${prefix}/dashboard`, dashboardRoutes);
  app.use(`${prefix}/activity`, activityRoutes);
};

// Mount for both with /api and without /api (handles any rewrite strategy)
mountApiRoutes("/api");
mountApiRoutes("");

// 404 & Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Standalone server mode (when not invoked as a serverless function on Vercel)
if (!process.env.VERCEL && process.env.NODE_ENV !== "test") {
  app.listen(PORT, async () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Bull Board: http://localhost:${PORT}/admin/queues`);

    // Recovery
    try {
      await recoverMissedJobs();
    } catch (err) {
      console.warn("⚠️ Job recovery skipped:", err.message);
    }
  });

  // Start background worker in standalone mode
  import("./workers/postWorker.js").catch((err) =>
    console.warn("Worker start warning:", err.message)
  );
}

export default app;
