FROM oven/bun:canary-alpine AS base

FROM base AS deps
WORKDIR /deps
COPY ./frontend/package.json .
COPY ./frontend/bun.lock .
RUN bun install --frozen-lockfile

FROM base AS builder
WORKDIR /builder
COPY --from="deps" /deps/node_modules ./frontend/node_modules
COPY ./frontend/src ./frontend/src
COPY ./frontend/public ./frontend/public
COPY ./frontend/index.html ./frontend
COPY ./frontend/.env.production ./frontend
COPY ./frontend/package.json ./frontend
COPY ./frontend/tsconfig.json ./frontend
COPY ./frontend/tsconfig.app.json ./frontend
COPY ./frontend/tsconfig.node.json ./frontend
COPY ./frontend/vite.config.ts ./frontend

COPY ./tsconfig.base.json .

RUN cd ./frontend && bun run tsc -b --noCheck && bun run vite build

FROM nginx:latest
RUN rm -rf /usr/share/nginx/html
RUN mkdir /usr/share/html

COPY --from="builder" ./builder/frontend/dist /usr/share/nginx/html
