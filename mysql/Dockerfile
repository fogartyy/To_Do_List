FROM mysql:8.0

# Copy the initialization script to the container
COPY init.sql /docker-entrypoint-initdb.d/

# Set the MySQL root password using environment variable
ENV MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}

# Set the MySQL database name using environment variable
ENV MYSQL_DATABASE=${MYSQL_DATABASE}
