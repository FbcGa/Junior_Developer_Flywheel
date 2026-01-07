FROM node:20-alpine AS base

ARG APP_DIR=.

RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /code

COPY ${APP_DIR}/package.json ${APP_DIR}/pnpm-lock.yaml* ${APP_DIR}/pnpm-workspace.yaml* ./
RUN pnpm install

FROM base AS dev
ARG APP_DIR=.
COPY ${APP_DIR}/. .
CMD ["pnpm", "dev"]

FROM base AS builder
ARG APP_DIR=.
COPY ${APP_DIR}/. .
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /code
ENV NODE_ENV=production

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=builder /code/package.json ./
COPY --from=builder /code/.next ./.next
COPY --from=builder /code/public ./public
COPY --from=builder /code/node_modules ./node_modules

CMD ["pnpm", "start"]
