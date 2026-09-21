# 🤝 Contributing Guide

Danke, dass du zum **FW Display – Feuerwehr Einsatzmonitor** beitragen möchtest! 🚒🔥  
Dieses Dokument beschreibt, wie du sauber, sicher und nachvollziehbar am Projekt mitarbeitest.

---

## 📋 Voraussetzungen

### Benötigte Tools (lokal)

- Node.js ≥ 20
- npm ≥ 10
- Docker & Docker Compose
- Git

Optional:
- PostgreSQL (für lokale Entwicklung ohne Docker)
- Redis

---

## 🧭 Projektüberblick

**FW Display** besteht aus:

- **Frontend** – Vue 3 + Tailwind
- **Backend** – Node.js + Apollo Server + Prisma
- **Database** – PostgreSQL
- **Cache / PubSub** – Redis
- **Deployment** – Docker Images via GitLab CI/CD

---

## 🌱 Lokale Entwicklung

### 1. Repository klonen

```bash
git clone https://gitlab.com/MarJun1988/fw-display.git
cd fw-display
```
### 2. Services starten (DEV)

```bash
docker compose -f docker-compose.dev.yml up
```

### 3. Backend starten

```bash
cd backend
npm install
npm run dev
```

### 4. Frontend starten

```bash
cd frontend
npm install
npm run dev
```

## 🧪 Code-Qualität

```bash
npm run lint
npm run typecheck
```

Pull Requests müssen lint- und typecheck-fehlerfrei sein.

## 🔀 Branching
- `main` – Produktion
- `testing` – Testsystem
- `developer` – Entwicklung
- `feature/*` – Neue Features
- `fix/*` – Bugfixes

## 🔐 Security
❌ Nicht committen:
- `.env`
- SSL-Zertifikate
- Private Keys
- Tokens

Secrets werden über GitLab CI Variablen oder `.env` bereitgestellt.
