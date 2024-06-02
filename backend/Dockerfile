FROM node:16 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM node:16-alpine
WORKDIR /app
RUN apk add --no-cache bash
RUN npm install -g @nestjs/cli
COPY package*.json ./
RUN npm install --only=production
COPY --from=build /app/dist ./dist
COPY nest-cli.json tsconfig.json ./
COPY wait-for-it.sh ./
RUN chmod +x wait-for-it.sh
RUN chmod -R 755 /app/dist
EXPOSE 5000
CMD ["./wait-for-it.sh", "mysql:3306", "--", "node", "dist/main.js"]
