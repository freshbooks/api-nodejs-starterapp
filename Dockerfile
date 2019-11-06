FROM node:alpine
EXPOSE 3000

# setup working dir
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile