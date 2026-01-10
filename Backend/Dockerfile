# ---------- Build Stage ----------
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy source code
COPY . .

# Expose backend port
EXPOSE 4000

# Use environment variables from docker-compose or ECS
CMD ["node", "index.js"]
