# 📦 Changelog

Alle relevanten Änderungen an **FW Display – Feuerwehr Einsatzmonitor**  
werden in diesem Dokument festgehalten.

Das Format orientiert sich an **Keep a Changelog**  
und folgt **Semantic Versioning** (`MAJOR.MINOR.PATCH`).

---

## [2.1.0] – 2025-12-22

### 🚀 Stabilisierung, Dokumentation & UI-Optimierungen

#### 🔥 Added

- Vollständig integrierte und ausgebaute **Online-Hilfe**
- Persistente **Tabelleneinstellungen im Browser (LocalStorage)**
- Zusätzliche Fehler- und Statusseiten (403 / 404 / 500 / 50x)
- Erweiterte Dokumentation (VitePress) inkl. Dashboard- und Management-Bereiche

#### 🔧 Changed

- Dashboard-Layout optimiert:
    - Karte prominenter platziert
    - Bessere visuelle Gewichtung zentraler Inhalte
- Verbesserte Versionierungs- und Release-Struktur
- CI/CD-Pipelines weiter stabilisiert
- Kleinere Layout- und UI-Optimierungen in mehreren Bereichen

#### 🐞 Fixed

- Fehler im automatischen **Datenbank-Backup** behoben
- Korrekte Extraktion und Anzeige von **Adressen aus Alarmdaten**
- Seitentitel wird zuverlässig aus der Datenbank geladen
- Diverse kleinere Bugfixes im Frontend und Backend

---

## [2.0.8] – 2025-12-22

#### 🔧 Changed

- Hilfe vollständig im neuen Design verfügbar

## [2.0.7] – 2025-12-21

#### 🔥 Added

- Einführung der Hilfe (schrittweiser Ausbau)

## [2.0.6] – 2025-12-19

#### 🔥 Added

- Speicherung von Tabelleneinstellungen im Browser

## [2.0.5] – 2025-12-19

#### 🐞 Fixed

- Automatisches Datenbank-Backup funktionierte nicht korrekt

## [2.0.4] – 2025-12-19

#### 🔧 Changed

- Dashboard-Layout angepasst
- Karte prominenter platziert

## [2.0.3] – 2025-12-16

#### 🐞 Fixed

- Seitentitel wird korrekt aus der Datenbank geladen

## [2.0.2] – 2025-12-15

#### 🔧 Changed

- Saubere Versionierung eingeführt
- CI/CD-Pipelines stabilisiert

## [2.0.1] – 2025-12-15

#### 🐞 Fixed

- Adresse wurde nicht immer korrekt aus Alarmdaten extrahiert

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
