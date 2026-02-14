# Plan: Simple Auth + Security Hardening + Fly.io Deployment

## Overview

Add password-based auth for a single user, fix security issues, and prepare the app for Fly.io deployment as a single Express process serving both the API and the built React frontend.

---

## Part 1: Backend Auth

### 1.1 Add `jsonwebtoken` dependency
- `npm install jsonwebtoken` in root package.json

### 1.2 Create `server/middleware/auth.js`
- Read `QUIZ_PASSWORD` from env (required — refuse to start without it)
- Read `JWT_SECRET` from env (or generate a random one at startup with `crypto.randomBytes`)
- Export `loginHandler`: `POST /api/login` — accepts `{ password }`, compares with `crypto.timingSafeEqual`, returns `{ token }` (JWT, 7d expiry)
- Export `requireAuth` middleware — checks `Authorization: Bearer <token>`, verifies JWT, returns 401 if invalid

### 1.3 Update `server/index.js`
- Mount `POST /api/login` (unprotected)
- Apply `requireAuth` middleware to all `/api/*` routes AFTER login
- Serve `client/dist/` as static files for production
- Add catch-all `*` route that serves `index.html` (SPA fallback)
- Restrict CORS: only allow the frontend origin in dev, no CORS needed in production (same origin)
- Use `PORT` from env (default 3001) for Fly.io compatibility
- Add basic rate limiting on `/api/login` (simple in-memory counter: max 5 attempts per minute per IP)
- Don't leak stack traces: add error handler that returns generic message in production

---

## Part 2: Frontend Auth

### 2.1 Create `client/src/context/AuthContext.jsx`
- React context with `token`, `login(password)`, `logout()`, `isAuthenticated`
- Token stored in `localStorage`
- `login()` calls `POST /api/login`, stores token on success
- `logout()` clears token

### 2.2 Update `client/src/api.js`
- Read token from `localStorage`, attach `Authorization: Bearer <token>` header
- On 401 response: clear token from localStorage, redirect to `/login`

### 2.3 Create `client/src/pages/LoginPage.jsx`
- Simple password input + submit button
- Styled with existing Tailwind theme
- Shows error on wrong password
- Redirects to `/` on success

### 2.4 Update `client/src/main.jsx`
- Wrap `<App>` with `<AuthProvider>`

### 2.5 Update `client/src/App.jsx`
- Add `/login` route (unprotected)
- Add `<ProtectedRoute>` wrapper that redirects to `/login` if no token
- Wrap existing routes (`/`, `/quiz`, `/results/:id`) with protection

---

## Part 3: Fly.io Deployment Setup

### 3.1 Add build script to root `package.json`
- `"build": "cd client && npm install && npm run build"`
- `"start": "node server/index.js"`

### 3.2 Update `server/index.js` for production static serving
- If `client/dist/` exists, serve it with `express.static`
- SPA catch-all: `GET *` → `client/dist/index.html` (only for non-API routes)

### 3.3 Create `Dockerfile`
```dockerfile
FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY client/package*.json client/
RUN cd client && npm install
COPY . .
RUN cd client && npm run build
EXPOSE 3001
CMD ["node", "server/index.js"]
```

### 3.4 Create `fly.toml`
- App name, region, port 3001
- Mount a persistent volume at `./db` for SQLite
- Set `QUIZ_PASSWORD` and `JWT_SECRET` via `fly secrets set`

### 3.5 Create `.dockerignore`
- `node_modules`, `client/node_modules`, `client/dist`, `db/*.db`, `.git`

---

## Part 4: Security Hardening

Applied throughout the above steps:
1. **CORS restricted** — dev only, same-origin in production
2. **Rate limiting** on login — prevent brute force
3. **Timing-safe comparison** — `crypto.timingSafeEqual` for password check
4. **No stack traces** in production error responses
5. **JWT expiry** — 7 day tokens
6. **All API routes protected** behind auth middleware

---

## Files Changed/Created

| File | Action |
|------|--------|
| `package.json` | Edit — add jsonwebtoken, build/start scripts |
| `server/middleware/auth.js` | **Create** — login handler + requireAuth middleware |
| `server/index.js` | Edit — wire auth, static serving, error handling |
| `client/src/context/AuthContext.jsx` | **Create** — auth state management |
| `client/src/api.js` | Edit — attach auth headers, handle 401 |
| `client/src/pages/LoginPage.jsx` | **Create** — login UI |
| `client/src/main.jsx` | Edit — wrap with AuthProvider |
| `client/src/App.jsx` | Edit — add login route + protected routes |
| `Dockerfile` | **Create** |
| `fly.toml` | **Create** |
| `.dockerignore` | **Create** |
