FROM node:12.22.3-alpine3.14

WORKDIR /usr/src/app

COPY server/package*.json ./server/
COPY ui/package*.json ./ui/

RUN cd server/ && npm ci
RUN cd ui/ && npm ci

COPY . .

RUN cd server/ && npm run build
RUN cd ui/ && npm run build

VOLUME /db

EXPOSE 4000
CMD NODE_ENV=production node ./server/dist/app.js
