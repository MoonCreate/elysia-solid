FROM oven/bun:canary-alpine AS base

FROM base AS deps
WORKDIR /deps
COPY ./backend/package.json .
COPY ./backend/bun.lock .
RUN bun install --frozen-lockfile

FROM base AS builder
WORKDIR /builder
COPY --from="deps" /deps/node_modules ./node_modules
COPY ./backend/src ./backend/src
COPY ./backend/package.json ./backend
COPY ./backend/tsconfig.json ./backend
COPY ./tsconfig.base.json .
RUN cd ./backend && bun run build:bin --outfile ./server

FROM base AS runner
COPY --from="builder" /builder/backend/server .

CMD ["./server"]
