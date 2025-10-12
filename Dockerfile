# Multi-stage Dockerfile for Frontend and Backend

# --------- Frontend Build Stage ---------
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY StarOneCRM-v9/Frontend/package*.json ./
RUN npm install
COPY StarOneCRM-v9/Frontend ./
RUN npm run build

# --------- Backend Build Stage ---------
FROM node:20-alpine AS backend-build
WORKDIR /app/backend
COPY StarOneCRM-v9/Backend/package*.json ./
RUN npm install
COPY StarOneCRM-v9/Backend ./
RUN npm start

# --------- Production Stage ---------
FROM node:20-alpine AS production
WORKDIR /app

# Copy built frontend (static files)
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

# Copy built backend
COPY --from=backend-build /app/backend ./

# Expose backend port (change if needed)
EXPOSE 3000

# Start backend (adjust if your backend uses a different entry point)
CMD ["npm", "start", "--prefix", "./backend"]