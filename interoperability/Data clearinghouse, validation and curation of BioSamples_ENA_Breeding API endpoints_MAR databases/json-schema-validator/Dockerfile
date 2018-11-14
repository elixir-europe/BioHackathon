FROM node:carbon

# Create app directory
RUN mkdir /app
WORKDIR /app

ADD src ./src
ADD config ./config
COPY package*.json ./

RUN npm install
CMD ["node", "./src/app.js"]
