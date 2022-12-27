FROM node:18.12.1-buster

WORKDIR /usr/src/app
VOLUME /db
EXPOSE 4000

COPY server/package*.json ./server/
COPY ui/package*.json ./ui/

RUN cd server/ && npm ci
RUN cd ui/ && npm ci

COPY . .

RUN cd server/ && npm run build
RUN cd ui/ && npm run build

CMD NODE_ENV=production node ./server/dist/app.js
