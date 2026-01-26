#!/bin/bash

# 1️⃣ Warten bis die DB erreichbar ist
until php bin/console doctrine:query:sql "SELECT 1" > /dev/null 2>&1; do
  echo "⏳ Warte auf Datenbank..."
  sleep 2
done
echo "✅ Datenbank erreichbar."

# 2️⃣ Migrationen ausführen
echo "🚀 Führe Doctrine Migrationen aus..."
php bin/console doctrine:database:drop --force || true
php bin/console doctrine:database:create || true
php bin/console doctrine:schema:update --force || true

# 3️⃣ Cache warmup
php bin/console cache:clear --no-warmup
php bin/console cache:warmup

# 4️⃣ PHP-FPM start
exec php-fpm