FROM node:22

WORKDIR /usr/src/APIRESTBeerProject

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]