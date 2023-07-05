### Dev KIT Laravel 8.*

**Admin:** admin@admin.com  
**Password:** secret

**User:** user@user.com  
**Password:** secret

## System Requirements
To be able to run Laravel Boilerplate you have to meet the following requirements:
- PHP 8.1
- Node.js >= 8.x
- Composer >= 2.5.5


# Install dependencies
composer install --prefer-dist --no-interaction

# Generate application key
php artisan optimize:clear
php artisan key:generate

# Create database tables and populate seed data
php artisan migrate --seed --no-interaction

# Install dependencies
npm install
npm run dev

