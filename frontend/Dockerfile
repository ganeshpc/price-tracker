# base stage
FROM node:20-alpine AS base

RUN mkdir -p /workdir

WORKDIR /workdir/app

# prod stage
FROM base AS build

COPY package*.json  .

RUN npm install

COPY . .

RUN npm run build
