FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "app"]

# FROM node:18
# WORKDIR /usr/src/app
# CMD ["git", "clone", "my repository"]
# RUN npm install
# CMD ["node", "app"]
