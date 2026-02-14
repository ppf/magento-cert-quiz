FROM node:20-slim

WORKDIR /app

# Install root dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Install client dependencies and build
COPY client/package*.json client/
RUN cd client && npm ci
COPY client/ client/
RUN cd client && npm run build

# Copy server code
COPY server/ server/

# Create db directory (volume will be mounted here)
RUN mkdir -p db

ENV NODE_ENV=production
EXPOSE 3001

CMD ["node", "server/index.js"]
