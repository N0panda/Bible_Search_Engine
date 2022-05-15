FROM node:16

WORKDIR /app

COPY package.json .

RUN npm install

ENV PATH /app/node_modules/.bin:$PATH

COPY . .

EXPOSE 3000

CMD ["npm", "start"]