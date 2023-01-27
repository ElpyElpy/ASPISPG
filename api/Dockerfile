FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /api
COPY package.json .
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 5000
RUN chown -R node /api
USER node
CMD ["node", "server.js"]
