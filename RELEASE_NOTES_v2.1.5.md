# v.2.1.5 – Adressauflösung und Prisma-Seeding

**Git-Tag:** `v.2.1.5`  
**Git-Tag-Nachricht:** `Release v.2.1.5: Adressauflösung und Prisma-Seeding`  
**GitHub-Release-Titel:** `v.2.1.5 – Adressauflösung und Prisma-Seeding`

## Änderungen

- Einsatzadressen mit zusammen geschriebenen Straßennamen, etwa `Niederwiesa-Niederwiesa AmRosenhag 8`, werden für die Kartensuche aufbereitet.
- Die Karte verwendet die aufbereitete Adresse zur Koordinatensuche.
- Die Prisma-Konfiguration lädt die Backend-Umgebung für Migrationen und Seeding.
- Der Prisma-Seeder enthält den Eintrag für `v.2.1.5`; `npm run seed` startet ihn mit Node.js.
- Ein Herdr-Startskript legt Tabs für Backend, Frontend und VitePress an.

## Aktualisierung

Im Verzeichnis `backend`:

```bash
npm ci
npm run prisma:migrate
npm run seed
```

Für die Ausführung auf dem Host muss `DATABASE_URL` in `backend/.env` auf die erreichbare PostgreSQL-Instanz zeigen.
