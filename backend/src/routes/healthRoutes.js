import express from "express";
import mongoose from "mongoose";

const router = express.Router();

/**
 * @route   GET /api/health
 * @desc    Comprehensive system health, uptime, and database status
 * @access  Public
 */
router.get("/", (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
  const memoryUsage = process.memoryUsage();

  res.status(200).json({
    status: "ok",
    service: "Social Media Strategy Backend",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: {
      status: dbStatus,
      readyState: mongoose.connection.readyState,
    },
    system: {
      nodeVersion: process.version,
      platform: process.platform,
      memoryHeapUsedMB: (memoryUsage.heapUsed / 1024 / 1024).toFixed(2),
      memoryRssMB: (memoryUsage.rss / 1024 / 1024).toFixed(2),
    },
  });
});

/**
 * @route   GET /api/health/ping
 * @desc    Simple liveness check for load balancers
 * @access  Public
 */
router.get("/ping", (req, res) => {
  res.status(200).json({ ping: "pong" });
});

export default router;
