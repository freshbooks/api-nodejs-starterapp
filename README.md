# FreshBooks NodeJS Starter

![](https://github.com/freshbooks/api-starterapp/workflows/Node%20CI/badge.svg)

The NodeJS Starter is a pre-configured `ExpressJS` app to quickly build FreshBooks app integrations.

## Installation

Clone / fork the repo and install dependencies:

```shell
$ git clone git@github.com:freshbooks/api-starterapp.git
$ cd api-starterapp

$ npm install

# Or, if you prefer yarn
$ yarn install
```

## Getting started

The starter app is configured to look for `CLIENT_ID`, `CLIENT_SECRET`, and `CALLBACK_URL` from your shell's environment variables.

To setup your app, set the following environment variables in your shell, or provide a `.env` file with the required values.
After setting up the app environment variables, the app is ready for use.

```bash
export CLIENT_ID=client_id
export CLIENT_SECRET=client_secret
export CALLBACK_URL=https://freshbooks.app/auth/freshbooks/redirect

yarn build
yarn start

# To watch for changes, and rebuild on save, use `watch`
yarn watch

# To watch for changes, and debug, use `debug:watch`
yarn debug:watch
```
