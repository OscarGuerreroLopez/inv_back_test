FROM node:14

COPY . /app

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm run test
# Build application
RUN npm run build



# ENV PORT=9000

EXPOSE 5000

CMD ["node", "dist/src/index.js"]
