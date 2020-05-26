# modo2auth-js

> A node module to generate authentication details to communicate with Modo servers

# Prerequesites

**Credentials** that are created and shared by Modo. These will be different for each environment (`int`, `prod`, `local` etc...).

- `api_identifier` - API key from Modo
- `api_secret` - API secret from Modo

These values will be used when intantiating the library.

# Install

From the root of your project, (where the `package.json` resides), run one of the following commands.

```bash
# via npm
npm install modopayments-ux/modo2auth-js

# via yarn
yarn add modopayments-ux/modo2auth-js
```

# Example Usage

Here's an example using `node-fetch` to make requests. You can use your preferred method or library.

## `GET` Example

```js
// 1. IMPORT
const Modo2Auth = require('modo2auth-js')
const fetch = require('node-fetch') // for example purposes

// 2. INSTANTIATE
const creds = {
  api_identifier: '...', // get these from MODO
  api_secret: '...', // get these from MODO
}
const modo2Auth = new Modo2Auth(creds)

// 3. SEND REQUEST
const api_host = 'http://localhost:82' // TODO: will need to use a public endpoint
const api_uri = '/v2/vault/public_key' // endpoint you want to hit
fetch(api_host + api_uri, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: modo2Auth.getToken(api_uri),
  },
})
  .then(resp => {
    // https://github.com/node-fetch/node-fetch methods
    return resp.text()
  })
  .then(text => {
    console.log('text', text)
  })
```

## `POST` Example

```js
// 1. IMPORT
const Modo2Auth = require('modo2auth-js')
const fetch = require('node-fetch') // for example purposes

// 2. INSTANTIATE
const creds = {
  api_identifier: '...', // get these from MODO
  api_secret: '...', // get these from MODO
}
const modo2Auth = new Modo2Auth(creds)

// 3. SEND REQUEST
const api_host = 'http://localhost:82' // TODO: will need to use a public endpoint
const api_uri = '/v2/reports' // endpoint you want to hit
// `body` is included due to this being a POST request
const body = {
  start_date: '2020-05-01T00:00:00Z',
  end_date: '2020-05-26T00:00:00Z',
}
fetch(api_host + api_uri, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: modo2Auth.getToken(api_uri, body),
  },
  body: JSON.stringify(body),
})
  .then(resp => {
    // https://github.com/node-fetch/node-fetch methods
    return resp.text()
  })
  .then(text => {
    console.log('text', text)
  })
```

# API

## `constructor(credentials)`

Returns an instance of the `Modo2Auth` class.

`credentials` (object) with the following properties:

- `api_identifier` (string) - API key from Modo
- `api_secret` (string) - API secret from Modo

## `getToken(api_uri, body)`

Returns a Modo2Auth token (string) to be added to an HTTP request as an Authorization header (`{Authorization: value}`).

`api_uri` (string) - Api Uri intending to call to (ex: `"/v2/vault/public_key"`)

`body` (string, object, null) - Body of the request

- (string) should be stringified JSON
- (object) from be well-formed JSON
- for `GET` requests, leave as `null`

## `signRequest(api_uri, request)`

Returns an HTTP request (object) with a Modo2Auth token added as an Authorization header.

`api_uri` (string) - Api Uri intending to call to (ex: `"/v2/vault/public_key"`)

`request` (object) - HTTP request being made, inluding body

# Development

Prerequisite: `yarn` installed globally

1. Install [`yarn`](https://classic.yarnpkg.com/en/docs/install) globally on your machine
2. In the root of this directory, run `yarn`
3. Unit test - `yarn run test`
