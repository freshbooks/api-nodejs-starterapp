FROM node:alpine

# setup working dir
WORKDIR /usr/src/app

# Copy the deps
COPY package.json .
# For the private registry
COPY .npmrc .

# Fetch deps
RUN npm install --quiet

# Copy src files
COPY . .

# Now transpile
RUN npm run build-ts

EXPOSE 9999

CMD npm start