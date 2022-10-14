FROM node:18
WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
RUN npx prisma generate --schema ./prisma/schema.prisma

COPY . .
RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]