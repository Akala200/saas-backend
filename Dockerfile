# Use official Node.js base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy only package.json for layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build TypeScript
RUN npm run build

# Use production port from .env (default fallback)
ENV PORT=4000

# Expose port
EXPOSE $PORT

# Start the app
CMD ["npm", "run", "start"]
