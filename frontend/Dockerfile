From node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./

COPY . ./

RUN npm ci

ENTRYPOINT [ "/usr/local/bin/npm" , "start"]