FROM node:alpine
WORKDIR '/client'
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY --from=0 /client/build /usr/share/nginx/html