# Deploy to Fly.io

## Prerequisites

```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Verify
fly version
```

## First-Time Setup

```bash
# Authenticate
fly auth login

# Launch app (skip if already created)
fly launch --no-deploy

# Create persistent volume for SQLite
fly volumes create quiz_data --region iad --size 1
```

## Set Secrets

```bash
fly secrets set QUIZ_PASSWORD=your-password JWT_SECRET=your-secret-key
```

Generate a strong JWT secret: `openssl rand -hex 32`

## Deploy

```bash
fly deploy
```

This builds the Docker image, pushes it, and starts the app. First deploy takes ~2 min.

## Verify

```bash
fly status          # Check app is running
fly logs            # Stream logs
fly open            # Open in browser
```

App URL: `https://magento-cert-quiz.fly.dev`

## Useful Commands

```bash
# SSH into running machine
fly ssh console

# View secrets (names only)
fly secrets list

# Update a secret (auto-redeploys)
fly secrets set QUIZ_PASSWORD=new-password

# Scale to always-on (no cold starts)
fly scale count 1 --max-per-region 1

# Volume management
fly volumes list
fly volumes extend <vol-id> --size 2

# Restart without redeploying
fly apps restart
```

## Troubleshooting

**App won't start — missing secrets**
```
Error: JWT_SECRET is required
```
Fix: `fly secrets set JWT_SECRET=xxx QUIZ_PASSWORD=xxx`

**Database errors — volume not attached**
```
SQLITE_CANTOPEN: unable to open database file
```
Fix: Verify volume exists (`fly volumes list`) and matches `fly.toml` mount config (`source = 'quiz_data'`, `destination = '/app/db'`).

**Cold starts are slow**
Machines auto-stop when idle (`auto_stop_machines = 'stop'` in `fly.toml`). To keep always-on:
```bash
fly scale count 1 --max-per-region 1
```
Then set `min_machines_running = 1` in `fly.toml` and redeploy.

**Force rebuild (clear Docker cache)**
```bash
fly deploy --no-cache
```
