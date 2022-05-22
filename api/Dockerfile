FROM node:17.3

# Create app directory
WORKDIR /usr/src/app

COPY ./package*.json ./
COPY ./ ./ 

RUN npm install

EXPOSE 3000

CMD npm run dev