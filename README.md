# modo2auth-js

> A node module to generate authentication details to communicate with Modo servers

# Prerequesites

**Credentials** that are created and shared by Modo. These will be different for each environment (`int`, `prod`, `local` etc...).

- `api_identifier` - API key from Modo
- `api_secret` - API secret from Modo

These values will be used when intantiating the library.

# Install

```bash
# via npm
npm install TBD

# via yarn
yarn add TBD
```

# Example Usage

Here's an example using `node-fetch` to make requests. You can use your preferred method or library.

```js
// 1. IMPORT
import Modo2Auth from 'modo2auth-js'
import fetch from 'node-fetch' // for example purposes

const creds = {
  api_identifier: '...', // get from Modo
  api_secret: '...', // get from Modo
}

// 2. INSTANTIATE
const modo2Auth = new Modo2Auth(creds)
const api_host = 'http://localhost:82' // TODO: need to find actual endpoint that we should point to as example
const api_uri = '/v2/vault/public_key' // endpoint you want to hit

// 3. SEND REQUEST
fetch(api_host + api_uri, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: modo2Auth.getToken(api_uri),
  },
})
  .then(resp => {
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
4. Build - `yarn run build` (for built package)
