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

# Start the Express.js app
CMD ["node", "server.js"]
