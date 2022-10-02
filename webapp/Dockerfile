FROM node:15-alpine AS deps
# Check https://github.com/nodejs/docker-node/#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . .
RUN npm ci

FROM node:15-alpine AS builder
WORKDIR /app
ENV NODE_ENV production

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM nginx:1-alpine AS server
WORKDIR /usr/share/nginx/html

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build .