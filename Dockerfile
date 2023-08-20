FROM node:16-alpine

WORKDIR /opt/app

ADD package*.json ./

RUN npm install

ADD . .

RUN npm run build

RUN npm prune --production

CMD ["npm", "run", "start:prod"]
