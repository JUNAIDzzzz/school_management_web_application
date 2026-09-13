# Brightfield Public School — School Management Web Application

A full-stack school website with a Student & Fee Management system, built for a technical
assignment. Public visitors can browse the school website; Admin and Finance staff sign in
to a role-based dashboard to manage students, finance users, and monthly fee collection.

## Project Overview

- **Public website** — landing page, about, academics, facilities, gallery, and contact
  sections with a modern, animated UI.
- **Admin portal** — dashboard overview, student CRUD, finance user management, fee
  overview, and monthly reports.
- **Finance portal** — dashboard overview, student fee list, fee management (mark fees
  paid / correct records), and monthly reports.
- **Fee engine** — fees are computed from Class + Student Type (Day Scholar ₹500 /
  Hostler ₹300 by default), with one fee record per student per month.

## Tech Stack

| Layer          | Technology                          |
|----------------|--------------------------------------|
| Frontend       | React (Vite), React Router, Tailwind CSS v4, Framer Motion |
| Backend        | Node.js, Express.js                 |
| Database       | MongoDB (Mongoose)                  |
| Authentication | JWT + bcrypt password hashing       |

## Features

- Public school website with responsive navigation, hero, about/vision/mission,
  class listing (1–10), facilities, gallery, and contact section.
- Role-based authentication (Admin / Finance) with hashed passwords and protected routes,
  authorization enforced server-side on every request.
- Admin: dashboard stats, full student CRUD with search/filter by class, finance user
  management, read-only fee overview, monthly reports.
- Finance: dashboard stats, student fee list, mark fees as paid, correct fee records,
  filter by month/class/payment status, monthly reports with CSV export & print.
- A continuously-tracking custom cursor and micro-animations throughout the UI
  (Framer Motion), built mobile/tablet/desktop responsive.

## Project Structure

```
Junaid Project/
├── backend/                 Express API (MVC-style)
│   ├── server.js
│   └── src/
│       ├── config/db.js
│       ├── models/          Mongoose schemas
│       ├── controllers/
│       ├── routes/
│       ├── middleware/      auth (JWT), role authorization, error handling
│       └── seed/seed.js     demo/seed data
└── frontend/                React (Vite) app
    └── src/
        ├── components/      public/ (website sections), dashboard/, common/
        ├── pages/           public/, admin/, finance/
        ├── context/         AuthContext
        ├── services/        axios API clients
        ├── routes/          ProtectedRoute (role-based guard)
        └── data/            static content + shared constants
```

## Setup Instructions

### Prerequisites
- Node.js 18+
- A running MongoDB instance (local, or a MongoDB Atlas connection string)

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # then edit .env (see Environment Variables below)
npm run seed            # seeds classes, students, users, and fee records
npm run dev              # starts the API on http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env    # defaults to http://localhost:5000/api
npm run dev               # starts the app on http://localhost:5173
```

Visit `http://localhost:5173` for the public site, and `http://localhost:5173/login`
to sign in to the Admin/Finance portals.

## Environment Variables

**backend/.env**

| Variable          | Description                                        |
|-------------------|-----------------------------------------------------|
| `PORT`            | API port (default `5000`)                          |
| `MONGO_URI`       | MongoDB connection string                          |
| `JWT_SECRET`      | Long random secret used to sign JWTs               |
| `JWT_EXPIRES_IN`  | Token lifetime (default `7d`)                      |
| `CLIENT_ORIGIN`   | Comma-separated allowed CORS origin(s)             |
| `ADMIN_EMAIL/PASSWORD/NAME`     | Default Admin account created by the seed script |
| `FINANCE_EMAIL/PASSWORD/NAME`   | Default Finance account created by the seed script |

**frontend/.env**

| Variable              | Description                       |
|-----------------------|------------------------------------|
| `VITE_API_BASE_URL`   | Base URL of the backend API        |

## Database Setup & Seed Instructions

1. Ensure MongoDB is running and `MONGO_URI` in `backend/.env` points to it.
2. From `backend/`, run `npm run seed`. This will:
   - Wipe and recreate Classes (1–10), Fee Structures (₹500 Day Scholar / ₹300 Hostler),
     the default Admin and Finance users, 50 demo students (mixed Day Scholar/Hostler),
     and fee records for every month elapsed this year (~70% pre-marked as paid).

## Demo Credentials

| Role     | Email                 | Password    |
|----------|------------------------|-------------|
| Admin    | admin@school.com       | admin123    |
| Finance  | finance@school.com     | finance123  |

## Deployment

- **Frontend:** Netlify (or any static host) — build with `npm run build` in `frontend/`,
  set `VITE_API_BASE_URL` to the deployed backend URL.
- **Backend:** Render (or similar Node hosting) — set the environment variables listed
  above, and run `npm run seed` once against the production database, then `npm start`.
- **Database:** MongoDB Atlas — use its connection string as `MONGO_URI`.

### Deployment Links
_(fill these in after deploying)_

- Live frontend: `TODO`
- Backend/API: `TODO`
- GitHub repository: `TODO`
