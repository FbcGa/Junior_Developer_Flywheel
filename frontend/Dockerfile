FROM node:20-alpine AS base

RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /code

COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./
RUN pnpm install

FROM base AS dev
COPY . .
CMD ["pnpm", "dev"]

FROM base AS builder
COPY . .
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
