FROM node:14-slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./ .

EXPOSE 4040

CMD ["npm", "start"]