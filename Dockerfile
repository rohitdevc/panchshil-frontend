FROM node:22-alpine AS base

# -------------------------
# Dependencies
# -------------------------
FROM base AS deps

WORKDIR /app

RUN npm install -g npm@latest

COPY package.json package-lock.json ./

RUN npm ci


# -------------------------
# Build
# -------------------------
FROM base AS builder

WORKDIR /app

ARG NEXT_PUBLIC_BASE_API_ENDPOINT
ENV NEXT_PUBLIC_BASE_API_ENDPOINT=$NEXT_PUBLIC_BASE_API_ENDPOINT

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build


# -------------------------
# Production
# -------------------------
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=2982

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 2982

CMD ["node", "server.js"]