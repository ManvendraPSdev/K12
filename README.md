# EdTech CRM & Inquiry Management System

A full-stack EdTech CRM and Inquiry Management platform designed for educational institutions to receive, track, and manage inquiries from parents, students, and partner schools regarding admissions, scholarships, concerts, and general programs.

---

## 1. Project Overview

The **EdTech CRM & Inquiry System** provides a seamless workflow connecting prospective students/parents with educational counselors:
- **Public Inquiry Submission**: A responsive, accessible public portal allowing students, parents, and schools to submit detailed inquiries with real-time validation.
- **Administrative Authentication**: Secure, JWT-based administrator authentication with rate limiting and protected session management.
- **CRM Inquiry Management Dashboard**: A responsive data workspace displaying real-time inquiries fetched from Supabase PostgreSQL.
- **Search & Multi-Criteria Filtering**: Instant debounced search (by applicant name or phone) and server-side filtering by category, user type, and status.
- **Status Lifecycle Management**: Transition inquiry statuses (`PENDING` &rarr; `IN_PROGRESS` &rarr; `RESOLVED`) with live server-side synchronization.
- **Detailed Inspection & Safe Deletion**: Modal view for reading complete inquiry messages and a confirmation-guarded deletion workflow.

---

## 2. Technology Stack

- **Frontend**:
  - React 19 (JavaScript / JSX)
  - Vite (Build Tool & Dev Server)
  - React Router v7 (Client-Side Navigation & Protected Route Guards)
  - Redux Toolkit (Authentication State Management)
  - RTK Query (Server State, Query Caching, and Mutation Lifecycles)
  - Axios (HTTP Client with Bearer Token Interceptors)
  - Tailwind CSS (Utility-First Responsive Styling)
  - Lucide React (Icons)
- **Backend**:
  - Node.js (CommonJS runtime)
  - Express 5 (REST API Framework)
  - Prisma 6 (ORM & Database Client)
  - Supabase PostgreSQL (Cloud Database Storage)
  - jsonwebtoken (Stateless JWT Authentication)
  - bcrypt (Password Hashing with Salt)
  - Zod (Strict Schema & Parameter Validation)
  - express-rate-limit (Brute-Force Attack Prevention on Auth Routes)
  - helmet & cors (Security Headers & Origin Filtering)

---

## 3. Features

### Public Portal
- **Interactive Inquiry Form**: Captures Name, Email, Phone number, User Type, Category, and detailed Message.
- **Client-Side Validation**: Exact mirroring of backend Zod validation constraints (7–15 digit phone normalization, character limits).
- **Duplicate Submission Guard**: Disables controls during in-flight requests.
- **Success Feedback**: Clear confirmation screen showing the created inquiry reference ID with an option to submit additional inquiries.

### Admin Workspace
- **Protected Route Guards**: Automatically redirects unauthenticated users attempting to access `/admin` to `/login`, while redirecting authenticated admins away from `/login`.
- **Session Verification**: Validates existing JWT tokens against `/auth/me` on startup with loading indicators to prevent UI flicker.
- **Inquiry Listing Table**: Real-time table rendering applicant name, contact information (email & phone links), formatted submission dates, and badges.
- **Server-Side Debounced Search**: Searches across Name and Phone fields with a 400ms debounce and a one-click clear button.
- **Server-Side Filtering**: Supports independent and combined filtering by:
  - **Category**: Scholarship, Concert, Admission, General Query
  - **User Type**: Parent, Student, School
  - **Status**: Pending, In Progress, Resolved
- **Server-Side Pagination**: Full page navigation, numeric pagination links, and customizable page limit selector (5, 10, 25, 50).
- **Inquiry Details Modal**: Dedicated dialog fetching complete inquiry data (`GET /admin/inquiries/:id`), including full message text, contact cards, and audit timestamps.
- **Status Mutation**: Inline and modal status selector updating inquiry state with strict confirmation before cache invalidation.
- **Inquiry Deletion**: Destructive action protected by an identity confirmation dialog and automatic page fallback.
- **Administrative Logout**: Stateless server notification with complete client-side storage cleanup.

---

## 4. Project Architecture

The project is structured as a decoupled monorepo containing a standalone frontend (`/fe`) and backend (`/be`):

```text
.
├── be/                              # Backend Application (Node.js + Express 5)
│   ├── prisma/
│   │   ├── migrations/              # Prisma SQL migration files
│   │   │   └── 20261030045256_init/ # Initial migration
│   │   └── schema.prisma            # Prisma schema (Models: Admin, Inquiry; Enums)
│   ├── scripts/
│   │   └── seed-admin.js            # Initial administrator seed script
│   ├── src/
│   │   ├── config/                  # Database, CORS, and Environment loaders
│   │   ├── controllers/             # Request handlers (auth, inquiry)
│   │   ├── middlewares/             # JWT auth, error handler, Zod validator
│   │   ├── routes/                  # Express route routers
│   │   ├── services/                # Database queries and business logic
│   │   ├── utils/                   # Password hash, JWT helpers, ApiResponse, ApiError
│   │   ├── validators/              # Zod validation schemas
│   │   ├── app.js                   # Express application setup
│   │   └── server.js                # Server entry point
│   ├── .env.example                 # Backend environment variable template
│   └── package.json
│
├── fe/                              # Frontend Application (React + Vite)
│   ├── public/                      # Static assets & SPA redirect config
│   │   └── _redirects               # Netlify SPA routing fallback
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/              # Atomic UI components (Button, Input, Modal, Badge, Pagination)
│   │   │   └── layout/              # PublicLayout, AdminLayout, ProtectedRoute
│   │   ├── config/
│   │   │   └── constants.js         # Enum labels, badge styling tokens, pagination constants
│   │   ├── features/
│   │   │   ├── auth/                # LoginPage, LoginForm
│   │   │   ├── inquiry-admin/       # AdminDashboardPage, InquiryTable, InquiryFilters, Modals
│   │   │   └── inquiry-public/      # PublicInquiryPage, InquiryForm
│   │   ├── services/                # Axios instance & direct API services
│   │   ├── store/
│   │   │   ├── api/                 # RTK Query slice (inquiryApi, axiosBaseQuery)
│   │   │   ├── slices/              # Redux auth slice (token, session verify, logout)
│   │   │   └── index.js             # Redux store configuration
│   │   ├── utils/                   # Phone normalizer, date formatter, form validators
│   │   ├── App.jsx                  # Main routing tree
│   │   ├── index.css                # Tailwind CSS imports
│   │   └── main.jsx                 # React root mount
│   ├── .env.example                 # Frontend environment variable template
│   ├── tailwind.config.js           # Tailwind configuration
│   ├── vercel.json                  # Vercel SPA routing rewrite config
│   ├── vite.config.js               # Vite bundler configuration
│   └── package.json
│
├── render.yaml                      # Render cloud deployment blueprint
├── schema.sql                       # Database schema SQL reference
└── README.md                        # Documentation
```

---

## 5. Prerequisites

- **Node.js**: `v18.x` or `v20.x` (`v20.20.0` tested)
- **npm**: `v9.x` or higher (`v11.13.0` tested)
- **Database**: PostgreSQL database instance (Supabase project recommended)

---

## 6. Installation

Clone the repository and install dependencies for both the backend and frontend:

```bash
# 1. Install Backend Dependencies
cd be
npm install

# 2. Install Frontend Dependencies
cd ../fe
npm install
```

---

## 7. Environment Configuration

### Backend Environment (`be/.env`)
Copy the sample environment file in `be`:

```bash
cp be/.env.example be/.env
```

Edit `be/.env` with your configuration:

```env
NODE_ENV=development
PORT=8000

# Supabase PostgreSQL Connection String (Pooler or Direct)
DATABASE_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@[HOST]:5432/postgres"

# Allowed Frontend Origins (comma-separated if multiple)
CORS_ORIGIN="http://localhost:5173"

# JWT Secret (minimum 32 characters)
JWT_SECRET="your-secure-random-jwt-secret-string-at-least-32-chars"
JWT_EXPIRES_IN="1d"

# Seed Admin User Credentials
ADMIN_NAME="Admin"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="YourStrongPassword123!"
```

### Frontend Environment (`fe/.env`)
Copy the sample environment file in `fe`:

```bash
cp fe/.env.example fe/.env
```

Edit `fe/.env` to point to the backend API endpoint:

```env
VITE_API_BASE_URL="http://127.0.0.1:8000/api/v1"
```

---

## 8. Database Setup

1. **Verify Database Connectivity**: Ensure your PostgreSQL / Supabase instance is accessible.
2. **Apply Prisma Migrations**: Run the pre-configured migration to create the enum types, tables, and indexes:
   ```bash
   cd be
   npx prisma migrate deploy
   ```
3. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```
4. **Reference SQL (`schema.sql`)**:
   The root `schema.sql` file contains the exact DDL statements matching the database schema. While Prisma migrations are the standard method for managing the database schema in this project, `schema.sql` can be executed directly in the Supabase SQL Editor if setting up a fresh database without Prisma CLI.

---

## 9. Admin Creation

Public registration of administrator accounts is disabled by design. To create the initial administrator, use the provided seed script:

```bash
cd be
npm run seed:admin
```

This reads `ADMIN_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` from `be/.env`, securely hashes the password with `bcrypt`, and persists the admin record. If an administrator with that email already exists, the script safely skips creation without duplicate errors.

---

## 10. Running the Application

### 1. Start the Backend API Server
```bash
cd be
npm run dev
```
- **Backend API Base URL**: `http://127.0.0.1:8000/api/v1`
- **Health Check Endpoint**: `http://127.0.0.1:8000/api/v1/health`

### 2. Start the Frontend Application
```bash
cd fe
npm run dev
```
- **Frontend Application URL**: `http://localhost:5173`
  - Public Inquiry Form: `http://localhost:5173/`
  - Admin Login: `http://localhost:5173/login`
  - Admin Dashboard: `http://localhost:5173/admin`

---

## 11. API Documentation

Base Path: `/api/v1`

| Method | Endpoint | Auth | Purpose | Request Body / Query Params |
|---|---|---|---|---|
| `GET` | `/health` | Public | System health and database connectivity | None |
| `POST` | `/inquiries` | Public | Submit new customer inquiry | Body: `{ name, email, phone, userType, category, message }` |
| `POST` | `/auth/login` | Public (Rate-limited) | Authenticate administrator | Body: `{ email, password }` |
| `GET` | `/auth/me` | Bearer JWT | Fetch current administrator profile | Header: `Authorization: Bearer <token>` |
| `POST` | `/auth/logout` | Bearer JWT | Stateless logout notification | Header: `Authorization: Bearer <token>` |
| `GET` | `/admin/inquiries` | Bearer JWT | List paginated inquiries with filters | Query: `page, limit, category, userType, status, search, sortBy, sortOrder` |
| `GET` | `/admin/inquiries/:id` | Bearer JWT | Fetch complete single inquiry details | Params: `:id` (UUID) |
| `PATCH` | `/admin/inquiries/:id/status`| Bearer JWT | Update inquiry status | Params: `:id`, Body: `{ status: "PENDING"\|"IN_PROGRESS"\|"RESOLVED" }` |
| `DELETE`| `/admin/inquiries/:id` | Bearer JWT | Permanently delete inquiry | Params: `:id` (UUID) |

### Enums
- **`userType`**: `PARENT`, `STUDENT`, `SCHOOL`
- **`category`**: `SCHOLARSHIP`, `CONCERT`, `ADMISSION`, `GENERAL_QUERY`
- **`status`**: `PENDING`, `IN_PROGRESS`, `RESOLVED`

---

## 12. Authentication and Security

- **Password Hashing**: Passwords are never stored in plaintext. They are salted and hashed using `bcrypt` (10 rounds) before persistence.
- **Stateless JWT Tokens**: Upon successful login, the server signs an HMAC-SHA256 JWT containing the administrator's unique ID (`sub`) with an expiration period (`JWT_EXPIRES_IN`).
- **Protected Middleware (`authenticate`)**: Validates the `Authorization: Bearer <token>` header on all admin routes, verifies the signature, and confirms the administrator exists in the database.
- **Client Storage Policy**: Only the stateless JWT token and public admin profile (`{ id, name, email }`) are stored in `localStorage`. Passwords are never stored client-side.
- **Interceptors**: Axios automatically attaches the Bearer token to authenticated requests. A custom response interceptor catches `401 Unauthorized` responses and logs the user out, while intelligently exempting `/auth/login` from redirect loops on invalid credential submissions.
- **Why Custom JWT Over Supabase Auth**: Implementing custom JWT and bcrypt authentication ensures application portability, decoupling the business logic and user security layer from third-party proprietary auth providers while utilizing Supabase strictly as a PostgreSQL database.

---

## 13. Testing Instructions

### A. Public Inquiry Submission
1. Navigate to `http://localhost:5173/`.
2. Fill out the inquiry form (select User Type, Category, enter Name, Email, Phone, Message).
3. Click **Submit Inquiry**.
4. Confirm that the success confirmation screen appears displaying the generated Reference ID.

### B. Admin Login & Session Protection
1. Open an incognito browser window and attempt to visit `http://localhost:5173/admin`.
2. Confirm you are automatically redirected to `http://localhost:5173/login`.
3. Enter invalid credentials &rarr; confirm an error message is displayed.
4. Enter valid administrator credentials &rarr; click **Sign In**.
5. Confirm successful redirection to `/admin`.

### C. Inquiry Management Dashboard
1. **Search**: Enter an inquiry applicant name or phone number in the search bar. Confirm that results update after the 400ms debounce. Clear search using the (X) button.
2. **Filters**: Select a Category (e.g. `SCHOLARSHIP`) or User Type (e.g. `STUDENT`). Verify that only matching records appear. Click **Reset Filters** to restore the default view.
3. **Pagination**: Change the page size dropdown (e.g., 5 per page) and navigate through **Prev** / **Next** controls.
4. **View Details**: Click **View** on an inquiry row. Verify all applicant information and the message are displayed in the modal.
5. **Update Status**: Change the status dropdown from `PENDING` to `IN_PROGRESS` or `RESOLVED`. Refresh the page (`F5`) to verify that the updated status persists in Supabase.
6. **Delete Inquiry**: Click the trash icon on a test inquiry. Confirm the deletion dialog. Verify the record is permanently removed from the table and database.
7. **Logout**: Click **Logout** in the top navigation bar. Verify stored tokens are purged and you are redirected to `/login`.

---

## 14. Deployment

### Recommended Architecture
- **Frontend**: Hosted on [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
- **Backend API**: Hosted on [Render](https://render.com) (Web Service).
- **Database**: Cloud PostgreSQL hosted on [Supabase](https://supabase.com).

### 1. Backend on Render
1. Create a **New Web Service** connected to your repository.
2. Set Root Directory to `be`.
3. Set Build Command to:
   ```bash
   npm install && npx prisma generate
   ```
4. Set Start Command to:
   ```bash
   node src/server.js
   ```
5. Configure Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: `10000`
   - `DATABASE_URL`: `postgresql://postgres.[REF]:[PASS]@[POOLER_HOST]:5432/postgres`
   - `CORS_ORIGIN`: `https://your-frontend.vercel.app` (your deployed frontend URL)
   - `JWT_SECRET`: A secure 32+ character string
   - `JWT_EXPIRES_IN`: `1d`

### 2. Frontend on Vercel
1. Create a **New Project** on Vercel connected to your repository.
2. Set Root Directory to `fe`.
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Configure Environment Variables:
   - `VITE_API_BASE_URL`: `https://your-backend.onrender.com/api/v1`
6. `vercel.json` is included in `fe/` to handle client-side route rewrites automatically.

---

## 15. Repository Information

- **GitHub Repository**: `https://github.com/ManvendraPSdev/EdTech-CRM-Inquiry-System` *(Update with final repository URL)*
- **Live Demo URL**: Pending deployment configuration by repository administrator.

---

&copy; 2026 K12 Hunnar. All rights reserved.
