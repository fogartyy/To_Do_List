# Stage 1: Build the React app
FROM node:14.17.0 as react-build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
RUN npm run test
COPY ./ ./
RUN npm run build

# Stage 2: Create the production image
FROM node:14.17.0-alpine
WORKDIR /app

# Copy the built React app
COPY --from=react-build /app/build ./build

# Install MySQL client
RUN apk add --no-cache mysql-client

# Expose the necessary port
EXPOSE 3000

# Start the React app
CMD ["npx", "serve", "-s", "build"]
