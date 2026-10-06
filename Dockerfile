# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Enable pnpm via corepack
RUN corepack enable

# Copy manifest and lockfile
COPY package.json pnpm-lock.yaml ./

# Install dependencies (frozen to the lockfile)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build Next.js app
ARG PROFILE_LAST_UPDATED
ENV PROFILE_LAST_UPDATED=$PROFILE_LAST_UPDATED
RUN pnpm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Enable pnpm via corepack
RUN corepack enable

# Install only production dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# Copy built app from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./

# Expose port
EXPOSE 3000

# Start app
CMD ["pnpm", "start"]
