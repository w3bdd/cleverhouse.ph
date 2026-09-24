# Cleverhouse Philippines — Deployment Guide

The site has two deployment paths. Pick one.

---

## Option A — GitHub Pages (static site, free hosting)

GitHub Pages serves only static files, so this path deploys the React frontend alone.
The consultation form works like this there: if the backend can't be reached, it
automatically offers a "Send via Email" button that opens the visitor's mail app with
all their details pre-filled to contactus.cleverhouse@gmail.com, plus a call button.
To make the form deliver directly instead, host the backend (Option B) and set the
`REACT_APP_BACKEND_URL` repo variable so the Pages build points at it.

Steps:

1. Push this repository to GitHub (branch `main`).
2. In the repo: Settings → Pages → Source: "GitHub Actions".
3. Optional (enables the form): Settings → Secrets and variables → Actions →
   Variables tab → add `REACT_APP_BACKEND_URL` pointing at your hosted backend
   (e.g. `https://api.your-domain.com`).
4. Push to `main` (or run the "Deploy to GitHub Pages" workflow manually).
   The workflow at `.github/workflows/gh-pages.yml` builds with hash-based URLs
   and relative assets, so it works at both `username.github.io/repo/` and a
   custom domain.

Local static build (same output the workflow produces):

```bash
cd frontend
REACT_APP_GH_PAGES=true REACT_APP_BACKEND_URL=https://your-backend.com yarn build
# static site is now in frontend/build — upload anywhere
```

---

## Option B — VPS (full stack: frontend + FastAPI + MongoDB)

Requirements: Docker and Docker Compose on the VPS.

1. Copy the repo to the server.
2. Create the backend environment file:

   ```bash
   cp backend/.env.example backend/.env
   ```

   Edit `backend/.env`:
   - `CORS_ORIGINS` → your real domain (e.g. `https://cleverhouse.ph`)
   - `EMERGENT_EMAIL_KEY` → the email key from your Emergent project (needed for
     inquiry notification emails; without it the form still saves to MongoDB but
     no email is sent)
   - `MONGO_URL` stays `mongodb://mongo:27017` (the compose service name)

3. Build and start:

   ```bash
   docker compose up -d --build
   ```

4. The site is now on port 80. Nginx (in the frontend container) serves the React
   build and proxies `/api/*` to the FastAPI backend. MongoDB data persists in the
   `mongo_data` volume.

5. HTTPS: put a reverse proxy (Caddy, Traefik, or Nginx Proxy Manager) in front of
   port 80, or use your host's one-click SSL. Caddy example:

   ```
   your-domain.com {
       reverse_proxy localhost:80
   }
   ```

Useful commands:

```bash
docker compose logs -f backend     # backend logs
docker compose restart backend     # restart API only
docker compose up -d --build       # rebuild after code changes
```

Note: the `mongo:7` image needs a CPU with AVX support (true on almost all modern
VPS hosts). If Mongo fails to start on very old hardware, change the image to
`mongo:4.4` in `docker-compose.yml`.

---

## Environment variables reference

Backend (`backend/.env`):

| Variable | Purpose |
|---|---|
| `MONGO_URL` | MongoDB connection string |
| `DB_NAME` | Database name |
| `CORS_ORIGINS` | Allowed frontend origin(s) |
| `EMERGENT_EMAIL_KEY` | Emergent managed email key (inquiry notifications) |
| `EMAIL_FROM_NAME` | Sender display name on emails |
| `EMAIL_REPLY_TO` | Reply-To inbox |
| `OWNER_EMAIL` | Where new inquiry notifications are sent |

Frontend (build-time):

| Variable | Purpose |
|---|---|
| `REACT_APP_BACKEND_URL` | Backend origin. Empty = same-origin `/api` (VPS/compose). Set to your backend URL for static hosting. |
| `REACT_APP_GH_PAGES` | `true` switches to hash routing + relative assets for GitHub Pages |
