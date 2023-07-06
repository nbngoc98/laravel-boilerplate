#!/bin/sh

echo "Deploying application ..."

git pull origin main
php artisan optimize:clear

echo "Application deployed!"