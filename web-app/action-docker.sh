#!/bin/bash

RED='\033[0;31m'
NOCOLOR='\033[0m'

echo ""
echo ""
echo "${RED}##### => Install the require composer${NOCOLOR}"
echo ""
echo ""
composer install
echo ""
echo "${RED}##### => Start the php Unit tests${NOCOLOR}"
echo ""
echo ""
composer test-and-remove
#
#@putenv APP_ENV=test
#php bin/console doctrine:database:create
#php bin/console doctrine:schema:create
#phpunit --configuration phpunit.xml.dist --testdox
#php bin/console doctrine:database:drop --force
#
#php bin/console doctrine:database:create --env=test
#php bin/console doctrine:schema:create --env=test
#phpunit --configuration phpunit.xml.dist --testdox
#php bin/console doctrine:database:drop --force --env=test

#echo ""
#echo "${RED}##### => Start the phpstan analyse${NOCOLOR}"
#echo ""
#vendor/bin/phpstan analyse -c phpstan.neon.dist
#echo ""
