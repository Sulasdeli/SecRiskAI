# stage1 - build react app first
FROM node:lts-alpine

RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools
RUN apk add alpine-sdk

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE $PORT
CMD ["npm", "start"]