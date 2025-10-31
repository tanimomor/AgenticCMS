# 🧩 Artisan-Agentic-CMS

> Status: Building — not completed yet.

## Overview
A no-code CMS built with Next.js 14 (App Router) and MongoDB for persistence.
The UI is powered by TailwindCSS and shadcn-ui.
Supabase integration for auth and storage is planned in upcoming versions.

## Tech Stack
- Framework: Next.js 14 (App Router)
- UI: TailwindCSS, shadcn-ui, Radix UI
- Database: MongoDB (native driver)
- Runtime: Node.js 20 (Vercel Serverless)

## Requirements
- Node.js 20+
- Yarn 1.x
- MongoDB instance (local or managed)

## Getting Started
1. Install dependencies:
   yarn install

2. Configure environment variables in .env:
   MONGO_URL=mongodb://localhost:27017
   DB_NAME=your_database_name
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   CORS_ORIGINS=*

3. Run dev server:
   yarn dev
   App: http://localhost:3000

## Scripts
- yarn dev – Start Next.js dev server
- yarn build – Build for production
- yarn start – Start production server

## Environment Variables
- MONGO_URL – MongoDB connection string
- DB_NAME – Database name
- NEXT_PUBLIC_BASE_URL – Public base URL used by the client
- CORS_ORIGINS – Allowed origins for CORS (comma-separated or *)

## API
All routes are under /api/* via a catch-all route.

GET /api/root or GET /api/ – Health check
Response: { "message": "Hello World" }

POST /api/status – Insert a status check
Body JSON: { "client_name": "your-app" }
Response: { id, client_name, timestamp }

GET /api/status – List recent status checks (max 1000)
Response: [{ id, client_name, timestamp }, ...]

Notes:
- All responses include CORS headers based on CORS_ORIGINS.
- MongoDB _id is removed from list responses.

## Deployment (Vercel)
This repo includes vercel.json configured for Next.js and Node.js 20 serverless functions.

1. Push to GitHub/GitLab/Bitbucket.
2. Import the project in Vercel.
3. Set Environment Variables in Vercel Project Settings:
   - MONGO_URL
   - DB_NAME
   - NEXT_PUBLIC_BASE_URL (e.g., https://agentic-cms.vercel.app)
   - CORS_ORIGINS (e.g., your domains)
4. Deploy. Vercel will run yarn install and next build per vercel.json.

Images are configured as unoptimized in next.config.js for simpler CDN behavior.

## Roadmap
- Integrate Supabase (auth, storage)
- Expand CMS models and UI blocks
- Introduce AI-driven agentic workflows
- Add dashboard analytics and logging

Author: Omor Al Tanim
GitHub: https://github.com/tanimomor
Email: tanim.pro@gmail.com
