FROM node:20-alpine AS base

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /code

COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./

RUN pnpm install

FROM base AS dev
COPY . .
CMD ["pnpm", "dev"]
