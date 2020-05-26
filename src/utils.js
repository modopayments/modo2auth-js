const crypto = require('crypto') // https://nodejs.org/api/crypto.html
const base64url = require('base64url') // https://www.npmjs.com/package/base64url

const makeHeader = () => {
  const data = {
    alg: 'HS256',
    typ: 'JWT',
  }
  return base64url(JSON.stringify(data))
}

const makePayload = (api_uri, api_identifier, body, iat) => {
  // iat is exposed to allow to proper testing of the function
  const timestamp = Math.round(new Date().getTime() / 1000) // in seconds
  const body_hash = encodeHash(body) // hex digest of sha256 of data

  const payload = {
    iat: iat || timestamp,
    api_identifier,
    api_uri,
    body_hash,
  }

  return base64url(JSON.stringify(payload))
}

const makeSignature = (header, payload, secret) => {
  const data = `${header}.${payload}`
  const digest = crypto.createHmac('sha256', secret).update(data).digest('base64')

  return sanitizeString(digest)
}

function encodeHash(data) {
  return crypto.createHash('sha256').update(data).digest('hex')
}

function sanitizeString(url) {
  url = url.replace(/[+]/g, '-')
  url = url.replace(/[/]/g, '_')
  url = url.replace(/[=]/g, '')
  return url
}

module.exports = { makeHeader, makePayload, makeSignature, encodeHash, sanitizeString }
