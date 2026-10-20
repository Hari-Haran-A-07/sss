import IORedis from "ioredis";

const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";

const connection = new IORedis(redisUrl, {
  maxRetriesPerRequest: null,
  retryStrategy: (times) => {
    // Retry with backoff up to 10 seconds, but don't crash
    return Math.min(times * 1000, 10000);
  },
});

connection.on("error", (err) => {
  console.warn("⚠️ Redis Warning:", err.message);
});

export default connection;
