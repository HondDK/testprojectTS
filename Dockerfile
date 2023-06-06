FROM node:16-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm install sass
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
