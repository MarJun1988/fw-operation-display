FROM php:8.2-fpm

# System-Abhängigkeiten
RUN apt-get update && apt-get install -y --no-install-recommends \
    git unzip wget curl gnupg ca-certificates \
    nodejs npm \
    libicu-dev libzip-dev zlib1g-dev \
    # Chromium + Runtime Dependencies
    chromium \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libdrm2 \
    libxdamage1 \
    libgbm1 \
    libxkbcommon0 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libatspi2.0-0 \
    libnss3 \
    fonts-liberation \
    libappindicator3-1 \
    xdg-utils \
    && docker-php-ext-install pdo pdo_mysql intl zip \
    && pecl install pcov \
    && docker-php-ext-enable pcov \
    && rm -rf /var/lib/apt/lists/*

# Composer installieren
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Arbeitsverzeichnis
WORKDIR /var/www/html

# Panther-Umgebungsvariable (wichtig für Headless Chromium in CI)
ENV PANTHER_NO_SANDBOX=1
