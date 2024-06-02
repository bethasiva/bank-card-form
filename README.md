# Top up amount using bank card
## `NOTE: Make sure you use the latest version of Node js`

## Commands to run the Frontend server
### `cd client`
### `npm install`
### `npm start`

## Commands to run the Backend server

### Step 1: Install Composer (if not installed)
### `curl -sS https://getcomposer.org/installer | php sudo mv composer.phar /usr/local/bin/composer`

### Step 2: Navigate to your Laravel project in the server folder
### `cd server`

### Step 3: Install Laravel dependencies
### `composer install`

### Step 4: Set up the environment file
### `cp .env.example .env`

### Step 5: Generate an application key
### `php artisan key:generate`

### Step 6: Configure your database (edit .env file manually)

### Step 7: Run migrations
### `php artisan migrate`

### Step 8: Run database seeders (optional)
### `php artisan db:seed`

### Step 10: Start the development server
### `php artisan serve`
