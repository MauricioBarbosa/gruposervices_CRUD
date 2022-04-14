FROM node:16

WORKDIR /backend

COPY . . 

RUN npm install 

RUN npx prisma migrate

ENTRYPOINT npm run dev 

EXPOSE 3001