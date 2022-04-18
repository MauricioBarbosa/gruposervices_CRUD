FROM node:16

WORKDIR /frontend

COPY . . 

RUN npm install --force

RUN npm install -D @swc/cli @swc/core

ENTRYPOINT npm run dev

EXPOSE 3000