# Multi-stage production build for Node.js Express backend
FROM node:20-alpine AS base

WORKDIR /app

# Install dependencies first for efficient layer caching
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose backend API port
EXPOSE 5000

ENV NODE_ENV=production

# Run with node directly in production
CMD ["node", "src/server.js"]
