FROM node:20-slim

WORKDIR /app

COPY services/pdf-generator/package.json ./

RUN npm install

RUN apt-get update && apt-get install -y chromium qpdf --no-install-recommends

COPY common ./common/
COPY services/pdf-generator ./

RUN npm run build

CMD ["node", "app.js"]

#docker build -t pdf:0.0.1 -f Dockerfile ../../