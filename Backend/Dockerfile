FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable

RUN apk add --no-cache python3 make g++

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

ENV PORT=5000

RUN corepack enable

COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node . .

USER node

EXPOSE $PORT

CMD ["pnpm", "start"]