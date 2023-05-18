#!/bin/sh

# Set the MySQL database host, user, password, and script file name
MYSQL_HOST="localhost"
MYSQL_USER="root"
MYSQL_PASSWORD="root"
DATABASE_SCRIPT="database_script.sql"

# Wait for MySQL to be ready
until mysql -h "$MYSQL_HOST" -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" -e "SHOW DATABASES;" >/dev/null 2>&1; do
  echo "Waiting for MySQL to be ready..."
  sleep 1
done

# Create the database and import the script
mysql -h "$MYSQL_HOST" -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" < "$DATABASE_SCRIPT"

# Start the Express backend
node /app/backend/index.js