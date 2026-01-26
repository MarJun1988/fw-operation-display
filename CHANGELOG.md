# 📦 Changelog

Alle relevanten Änderungen an **FW Display – Feuerwehr Einsatzmonitor**  
werden in diesem Dokument festgehalten.

Das Format orientiert sich an **Keep a Changelog**  
und folgt **Semantic Versioning** (`MAJOR.MINOR.PATCH`).

---

## [2.0.0] – 2025-12-12
### 🚀 Major Release – Infrastruktur & CI/CD

#### 🔥 Added
- Vollständige **Docker-First Architektur**
- **Images-only Deployment** (kein Git mehr auf Zielsystemen)
- GitLab CI/CD Pipeline:
    - Lint
    - Typecheck
    - Build
    - Multi-Arch Docker Build (amd64 / arm64)
    - Registry Push
    - Automatisches Deploy via SSH
- Healthcheck-basierter Deploy mit Wait-for-Healthy
- Versionierte Docker Images (`latest`, `vX.Y.Z`, Commit-SHA)
- Backup-Container für PostgreSQL (Volumes + Rotation vorbereitet)
- `.env`-basierte Konfiguration für alle Services
- Prisma Seeder mit **Upsert ohne Überschreiben bestehender Daten**
- ESLint + TypeScript Typecheck (Backend & Frontend)

#### 🔧 Changed
- Frontend Build über Nginx (Production-ready)
- Backend vollständig containerisiert
- Prisma Config auf ENV-Variablen umgestellt
- Docker Compose für DEV / TEST / PROD getrennt
- Entfernen aller Git-Abhängigkeiten aus Deploy-Servern
- Einheitliche Projekt-Namenskonvention (`fw-display`)

#### 🛑 Removed
- Git Pull / Clone auf Zielsystemen
- Manuelle Builds auf Servern
- Unsichere Konfigurationswerte im Repository
- SSL-Zertifikate aus dem Git (jetzt extern gemountet)

---

## [1.5.0] – 2025-11-30
### ✨ Dashboard & UI Improvements

#### 🔥 Added
- Einsatz-Dashboard mit modularen Sektionen
- Leaflet-Karte mit Geocoding (OpenStreetMap / Nominatim)
- Live-Updates via GraphQL Subscriptions
- Konfigurierbare Anzeige-Sektionen (Generals)
- 404-Seite mit Feuerwehr-Design & Animationen

#### 🔧 Changed
- Layout-Optimierungen für Raspberry Pi Displays
- Tailwind-basierte Responsive UI
- Optimierte Address-Parsing-Logik

---

## [1.2.0] – 2025-11-10
### 🧠 Backend & Datenmodell

#### 🔥 Added
- Apollo Server v4
- Redis Pub/Sub
- Prisma ORM
- PostgreSQL Datenbank
- Healthcheck Endpoint `/health`

#### 🔧 Changed
- Migration auf TypeScript
- Strukturierte Store- & Composable-Architektur

---

## [1.0.0] – 2024-05-01
### 🎉 Initial Release

#### 🔥 Added
- Erste Version des Feuerwehr Einsatzmonitors
- Basis-Frontend (Vue 3)
- Basis-Backend Symfony
- Manuelle Deployments

---

## 🔖 Versioning-Richtlinie

- **MAJOR** – Breaking Changes / Architekturwechsel
- **MINOR** – Neue Features (abwärtskompatibel)
- **PATCH** – Bugfixes & kleinere Verbesserungen

---

## 📎 Links

- Projekt: FW Display – Feuerwehr Einsatzmonitor
- CI/CD: GitLab Pipelines
- Datenbank: PostgreSQL + Prisma
- Frontend: Vue 3 + Tailwind
- Backend: Node.js + Apollo Server
