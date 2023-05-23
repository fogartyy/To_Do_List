# Stage 1: Create the production image
FROM node:14.17.0-alpine
WORKDIR /app

# Copy the backend files
COPY ./ ./

# Install MySQL client
RUN apk add --no-cache mysql-client

# Install production dependencies
RUN npm install --production

# Expose the necessary port
EXPOSE 8080

# Set the environment variables for MySQL connection
ENV MYSQL_HOST=$MYSQL_HOST
ENV MYSQL_USER=$MYSQL_USER
ENV MYSQL_PASSWORD=$MYSQL_PASSWORD
ENV MYSQL_DATABASE=$MYSQL_DATABASE

# Start the Express.js app
CMD ["node", "server.js"]
