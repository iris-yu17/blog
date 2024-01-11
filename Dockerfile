FROM node:18.17.0
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install && yarn cache clean
COPY . .
RUN yarn build
EXPOSE 3000
CMD [ "yarn", "start" ]