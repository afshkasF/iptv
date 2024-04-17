FROM node

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY ./.production.env ./postcss.config.js ./tsconfig.json ./webpack.config.ts ./
COPY ./src ./src
RUN npm run build
RUN npm prune --omit=dev
STOPSIGNAL SIGKILL
EXPOSE 8080
CMD npm start
