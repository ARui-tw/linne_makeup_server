FROM node:17.5

WORKDIR /app

COPY . .

RUN npm ci --omit=dev

ENV HOST 0.0.0.0
EXPOSE 80

CMD [ "npm", "start" ]
