FROM node:20-alpine

WORKDIR /folders-tree

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build

EXPOSE 80

CMD ["npm", "run", "preview"]
