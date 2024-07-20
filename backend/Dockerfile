# base stage
FROM node:20-alpine AS base

RUN mkdir -p /workdir

WORKDIR /workdir/app

# prod state
FROM base AS prod

COPY package*.json  .

RUN npm install --production

COPY . . 

RUN npm run build

EXPOSE 9000

CMD ["node", "dist/index.js"]