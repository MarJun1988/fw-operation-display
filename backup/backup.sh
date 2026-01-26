#!/bin/sh

echo "📦 PostgreSQL Backup gestartet: $(date)"

BACKUP_DIR="/backups"
DB_URL="$DATABASE_URL"

# Dateiname basierend auf Datum
FILENAME="db-$(date +%F-%H-%M).sql"

# Backup erstellen
pg_dump "$DB_URL" > "$BACKUP_DIR/$FILENAME"

echo "✔️ Backup gespeichert als: $FILENAME"

# Backups löschen, die älter als 30 Tage sind
find "$BACKUP_DIR" -type f -mtime +30 -delete

echo "🧹 Alte Backups gelöscht (älter als 30 Tage)"
echo "✅ Fertig: $(date)"
