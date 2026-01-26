# Web Application Einsatzmonitor für alle Feuerwehr, Raspberry Pi 4

## First Start

1. git clone https://gitlab.com/MarJun1988/fw-operation-display.git
2. cd fw-operation-display
3. cd docker
4. docker-compose -p "fw-operation-display" up -d

## Go to the URL with a Webbrowser

[http://127.0.0.1](http://127.0.0.1)

## Wichtige Befehle

### erstellen einer Entity

    php bin/console make:entity

### Datenbank Migration erstellen

    php bin/console make:migration

    # Migration ausführen
    php bin/console doctrine:migrations:migrate


### erstellen eines Testes

    php bin/console make:test

### Php Unittest ausführen

     php ./vendor/bin/phpunit  

### Erstellen von Text Fixtures

    php bin/console make:fixtures

### Fixtures laden in die Datenbank

    php bin/console --env=test  doctrine:fixtures:load 