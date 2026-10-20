# 🚀 Social Media Strategy System (SocialPulse)

An **AI-powered Social Media Management & Strategy Platform** designed to help brands **plan, schedule, automate, analyze, and optimize** their social media presence — all in one unified workspace.

Built with a high-performance **MERN Stack + Redis & BullMQ** architecture, this platform provides businesses, agencies, and creators with end-to-end tooling for content ideation, automated multi-platform distribution, SEO backlink tracking, real-time analytics, and creative guidance.

---

## ✨ Features & Architecture

### 📌 Multi-Brand Workspace
* Create, manage, and isolate multiple brand profiles with dedicated workspaces.
* Store brand identity, industry field, and connected social account tokens.
* Quick launchers for content planning, scheduling, backlinks, and creative studio.

### 🎨 Creative Studio & Guides
* **Creative Studio Dashboard**: Hub for content format recommendations and best practices.
* **Static Post Guide**: Image dimensions, aspect ratios, file size limits, and composition tips for Instagram, Facebook, and LinkedIn.
* **Carousel Post Guide**: Multi-slide storytelling structures, hook frameworks, and technical slide specs.
* **Reel & Video Guide**: Short-form video pacing, hook retention rules, audio strategy, and 9:16 aspect ratio specifications.

### 🧰 Tools & Resources Hub
* Curated searchable directory of design, copy, video editing, and analytics tools.
* Live search with debounce, platform category filters, and direct links.

### 🗓️ Visual Content Calendar
* Drag-and-drop interactive calendar for campaign planning and content roadmaps.
* Filter and visualize upcoming deliverables by platform and content format.

### 📲 Smart Post Scheduling & BullMQ Engine
* Schedule multi-media posts for future automated publishing.
* Cloudinary media integration with automated multi-file uploads.
* BullMQ queue-based background worker with exponential backoff retries.
* Background crash-recovery service to automatically reschedule missed jobs after restarts.
* Real-time Bull Board monitoring dashboard at `/admin/queues`.

### 🔗 Backlink & SEO Outreach Tracker
* Track external backlink placements across Reddit, Medium, Quora, Dev.to, and niche blogs.
* Search, filter, and paginate backlinks by status (`Live`, `Pending`, `Removed`) and platform.

### 📊 Analytics & Reporting
* Visual analytics charts: Content Type Distribution, Platform Breakdown, Post Statuses, and Growth Trends.
* Client-side CSV and JSON export utility for stakeholder reporting.

### 🛡️ Enterprise Security & Robustness
* **Sliding Window Rate Limiter**: Protects sensitive endpoints against brute-force attacks and abuse.
* **Security Headers**: Standardized defenses against XSS, clickjacking, and MIME sniffing.
* **Schema Validation**: Express validation middleware verifying payloads for brands, posts, and backlinks.
* **Structured Error Handling**: Standardized error responses with distinct handling for Mongoose validation and duplicate key constraints.
* **Request Logger**: High-resolution execution timing logger for API performance observability.
* **Health Check API**: `/api/health` providing uptime, memory usage, and database connection state.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide Icons, React Icons, Material UI Breadcrumbs, Recharts, React Router DOM 6 |
| **Backend** | Node.js, Express.js (ES Modules), Mongoose, Cloudinary, Multer, JSON Web Tokens (JWT), Bcrypt.js |
| **Queues & Worker** | Redis 7, BullMQ, @bull-board/express |
| **DevOps & Containers** | Docker, Docker Compose, Nginx, GitHub Actions CI |

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: v20 or higher
* **MongoDB**: Local instance or MongoDB Atlas URI
* **Redis**: Local instance or Redis Cloud URL

### 1. Clone & Configure Environment

```bash
git clone https://github.com/Hari-Haran-A-07/sss.git
cd sss
```

Create `.env` inside `backend/`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/socialmedia
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
JWT_SECRET=your_jwt_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 2. Run with Docker Compose (Recommended)

To run the complete stack (MongoDB, Redis, Backend, and Frontend):

```bash
docker-compose up --build
```

* **Frontend**: `http://localhost`
* **Backend API**: `http://localhost:5000`
* **Bull Board**: `http://localhost:5000/admin/queues`

### 3. Local Development

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## 📡 API Overview

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/health` | System health, uptime & DB status | Public |
| `POST` | `/api/auth/register` | Register new user account | Public |
| `POST` | `/api/auth/login` | Authenticate and issue JWT token | Public |
| `GET` | `/api/brands` | List user brands | Required |
| `POST` | `/api/brands` | Create new brand profile | Required |
| `GET` | `/api/posts/brand/:brandId` | List brand posts (supports filter & pagination) | Required |
| `POST` | `/api/posts` | Schedule new post with media | Required |
| `PATCH` | `/api/posts/:id/toggle-status` | Toggle Draft / Scheduled status | Required |
| `POST` | `/api/posts/:id/retry` | Retry failed job execution | Required |
| `GET` | `/api/backlinks/brand/:brandId` | List brand backlinks | Required |
| `POST` | `/api/backlinks` | Create backlink record | Required |
| `GET` | `/api/activity/brand/:brandId` | View workspace audit activity trail | Required |
| `GET` | `/admin/queues` | BullMQ administrative queue board | Admin |

---

## 📄 License
ISC © Social Media Strategy System Contributors
