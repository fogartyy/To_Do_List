FROM mysql:8.0

# Copy the initialization script to the container
COPY init.sql /docker-entrypoint-initdb.d/

# Set the MySQL root password
ENV MYSQL_ROOT_PASSWORD=root

# Set the MySQL database name
ENV MYSQL_DATABASE=todolist
