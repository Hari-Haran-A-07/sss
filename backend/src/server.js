import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import "./workers/postWorker.js";

import authRoutes from "./routes/authRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import calendarRoutes from "./routes/calendarRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import backlinkRoutes from "./routes/backlinkRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";

import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware.js";
import { securityHeaders } from "./middleware/securityMiddleware.js";
import { requestLogger } from "./middleware/loggerMiddleware.js";
import { apiLimiter } from "./middleware/rateLimitMiddleware.js";

import { initBullBoard } from "./utils/bullBoard.js";
import { recoverMissedJobs } from "./jobs/recoveryService.js";

const startServer = async () => {
  try {
    await connectDB();

    const app = express();

    // Security & Logging Middlewares
    app.use(securityHeaders);
    app.use(requestLogger);
    app.use(cors());
    app.use(express.json());

    // Rate Limiting on API endpoints
    app.use("/api", apiLimiter.middleware());

    // Bull Board Queue UI
    const serverAdapter = initBullBoard();
    app.use("/admin/queues", serverAdapter.getRouter());

    // API Routes
    app.use("/api/health", healthRoutes);
    app.use("/api/auth", authRoutes);
    app.use("/api/brands", brandRoutes);
    app.use("/api/calendar", calendarRoutes);
    app.use("/api/posts", postRoutes);
    app.use("/api/backlinks", backlinkRoutes);
    app.use("/api/analytics", analyticsRoutes);
    app.use("/api/dashboard", dashboardRoutes);

    // 404 & Error Handling
    app.use(notFoundHandler);
    app.use(errorHandler);

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, async () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Bull Board: http://localhost:${PORT}/admin/queues`);

      // Recovery
      await recoverMissedJobs();
    });
  } catch (error) {
    console.error("❌ SERVER START ERROR:", error);
    process.exit(1);
  }
};

startServer();
