FROM node:20.14.0-alpine

WORKDIR /bui-api

COPY . .

COPY prisma ./prisma/

RUN npm install

RUN npx prisma generate

EXPOSE 3001

CMD ["npm","run","start:launch"]
