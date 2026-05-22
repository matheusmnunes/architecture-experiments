FROM node:25-alpine

WORKDIR /app

COPY services/core-api/package.json ./


#COPY common ./common/
#COPY services/core-api ./

RUN npm install

CMD ["sh", "-c", "npm install && npm run dev"]
#CMD ["npm", "run", "dev"]

#RUN npm run build

#CMD ["node", "dist/server.js"]

#docker build -t teste:0.0.1 -f ../../services/system/Dockerfile .

#docker build --no-cache -t core-api:0.0.1 -f Dockerfile ../../