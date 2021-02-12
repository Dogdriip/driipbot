FROM alpine:latest

RUN apk add --no-cache nodejs npm
WORKDIR /usr/src/app
COPY . .
RUN npm i
RUN npm run build
CMD npm run serve