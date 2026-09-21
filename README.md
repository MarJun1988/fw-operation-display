# 🚒 FW Operation Display

Feuerwehr Display ist ein webbasiertes Einsatz- und Informationsdashboard für Feuerwehren.
Es ist optimiert für große Displays (z.B. Gerätehaus, Leitstelle) sowie für
Raspberry-Pi-basierte Systeme.

## ✨ Features
- Live-Einsatzanzeige
- Kartenansicht mit OpenStreetMap / Leaflet
- Modulare, konfigurierbare Dashboard-Sektionen
- Docker-first Architektur
- Vollautomatisches CI/CD mit GitLab
- Images-only Deployment (kein Git auf Zielsystemen)

## 🏗️ Architektur
- **Frontend**: Vue 3, Tailwind CSS, Nginx
- **Backend**: Node.js, Apollo Server v4, Prisma
- **Datenbank**: PostgreSQL
- **Cache / PubSub**: Redis

## 🚀 Production Start
```bash
docker compose -f docker-compose.prod.yml up -d
```

## 📜 Lizenz
Dieses Projekt ist unter der MIT License lizenziert.

---

## 🚀 Erste Schritte

```bash
git clone https://gitlab.com/MarJun1988/fw-operation-display.git
cd fw-operation-display
```

Danach erreichst du die Anwendung per Browser unter:

👉 **https://127.0.0.1**

---

# ⚙️ Services im System

- PostgreSQL – Datenbank
- Redis – Cache & Pub/Sub
- Backend – Apollo GraphQL Server v4, Prisma, RedisPubSub
- Frontend – Vue 3 über Nginx (inkl. Reverse Proxy für `/api` + WebSocket)

---

## 🔌 API Endpunkte

| Typ | URL Beispiel             |
|-----|--------------------------|
| HTTP API | `https://IP-ADRESSE/api` |
| WebSocket API | `ws://IP-ADRESSE/api`    |

---

# 🧩 Docker Setup Überblick

Es gibt drei docker-compose Dateien:

| Datei | Zweck |
|-------|--------|
| `docker-compose.yml` | Standard / lokale Umgebung |
| `docker-compose.dev.yml` | Entwicklung |
| `docker-compose.prod.yml` | Produktion (SSL) |

---

## 📁 Projektstruktur

```
.
├─ backend/
├─ frontend/
├─ nginx/
│   ├─ ssl/
│   └─ default.conf
├─ backup/
│   ├─ backup.sh
│   └─ Dockerfile
├─ vitepress/
├─ docker-compose.yml
├─ docker-compose.dev.yml
├─ docker-compose.prod.yml
└─ .env
```

---

# 🔐 Umgebungsvariablen (.env)

```
POSTGRES_USER=appuser
POSTGRES_PASSWORD=appsecret
POSTGRES_DB=fw-operation-display

DATABASE_URL=postgres://appuser:appsecret@db:5432/fw-operation-display

NODE_ENV=production
BACKEND_PORT=4000
REDIS_HOST=redis

FRONTEND_HTTP_PORT=80
FRONTEND_HTTPS_PORT=443
```

⚠️ Wichtig: `.env` darf **nicht** ins Git eingecheckt werden.

---

# 🟦 Docker Compose Startbefehle

## Standard

```
docker compose up --build
docker compose down
```

---

# 🟩 Entwicklungsmodus (docker-compose.dev.yml)

Frontend & Backend lokal starten:

```
cd backend && npm install && npm run dev
cd frontend && npm install && npm run dev
```

Docker (nur DB + Redis):

```
docker compose -f docker-compose.dev.yml up
docker compose -f docker-compose.dev.yml down
```

---

# 🟥 Produktion (docker-compose.prod.yml)

```
docker compose -f docker-compose.prod.yml up --build -d
docker compose -f docker-compose.prod.yml down
```

Erfordert SSL-Zertifikate in:

```
nginx/ssl/
  ├─ fullchain.pem
  ├─ privkey.pem
```

---

# 🛠 Prisma Befehle

```
docker exec backend npx prisma migrate dev --name init
docker exec backend npx prisma migrate deploy
docker compose exec backend npx prisma migrate dev --name fix_unique_constraints
docker exec backend npx prisma db seed
```

---

# 🧪 GitLab CI/CD

- Build von Backend & Frontend
- Push ins GitLab Container Registry
- optional Deployment via SSH
- automatische Datenbank-Backups

Benötigte Variablen:

```
RASPI_HOST
RASPI_USER
SSH_PRIVATE_KEY
```

---

# 🗄 PostgreSQL Backups (eigener Docker-Container)

Das Projekt enthält einen automatisierten Backup-Container.  
Dieser:

✔ erstellt Backups in festen Intervallen  
✔ speichert sie im Volume `pg_backups`  
✔ löscht Backups älter als 30 Tage  
✔ benötigt keinen Cronjob auf dem Host

---

## 📦 backup/backup.sh

```sh
#!/bin/sh

echo "📦 PostgreSQL Backup gestartet: $(date)"

BACKUP_DIR="/backups"
DB_URL="$DATABASE_URL"

FILENAME="db-$(date +%F-%H-%M).sql"

pg_dump "$DB_URL" > "$BACKUP_DIR/$FILENAME"

echo "✔️ Backup gespeichert als: $FILENAME"

find "$BACKUP_DIR" -type f -mtime +30 -delete

echo "🧹 Alte Backups entfernt"
```

---

## 🐳 backup/Dockerfile

```Dockerfile
FROM alpine:3.18

RUN apk add --no-cache postgresql-client bash

COPY backup.sh /backup.sh

ENV DATABASE_URL=""

RUN chmod +x /backup.sh

CMD ["sh", "-c", "while true; do /backup.sh; sleep 3600; done"]
```

Backup-Frequenz änderbar (z. B. täglich):

```
sleep 86400
```

---

## 🧩 Einbinden in docker-compose

```yaml
backup:
  build: ./backup
  container_name: backup
  depends_on:
    db:
      condition: service_healthy
  environment:
    DATABASE_URL: ${DATABASE_URL}
  volumes:
    - pg_backups:/backups
  restart: always
```

### Volume:

```yaml
volumes:
  pgdata:
  pg_backups:
```

---

# 🔄 Restore

```bash
docker exec -i db psql -U appuser fw-operation-display < backup.sql
```

---

# 🎉 Viel Erfolg & guten Einsatz!
