FROM node:16-alpine AS development

WORKDIR /app

ADD package*.json ./

RUN npm install

ADD . .

CMD ["npm", "run", "start:dev"]
