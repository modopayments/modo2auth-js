const crypto = require('crypto') // https://nodejs.org/api/crypto.html
const base64url = require('base64url') // https://www.npmjs.com/package/base64url

module.exports = class Modo2Auth {
  constructor({ api_identifier, api_secret }) {
    this.api_identifier = api_identifier
    this.api_secret = api_secret
  }

  _makeHeader() {
    const data = {
      alg: 'HS256',
      typ: 'JWT',
    }
    return base64url(JSON.stringify(data))
  }

  _makePayload(api_uri, api_identifier, body, iat) {
    // iat is exposed to allow to proper testing of the function
    const timestamp = Math.round(new Date().getTime() / 1000) // in seconds
    const body_hash = this._encodeHash(body) // hex digest of sha256 of data

    const payload = {
      iat: iat || timestamp,
      api_identifier,
      api_uri,
      body_hash,
    }

    return base64url(JSON.stringify(payload))
  }

  _encodeHash(data) {
    return crypto.createHash('sha256').update(data).digest('hex')
  }

  _makeSignature(header, payload, secret) {
    const data = `${header}.${payload}`
    const digest = crypto.createHmac('sha256', secret).update(data).digest('base64')

    return this._sanitizeString(digest)
  }

  _sanitizeString(url) {
    url = url.replace(/[+]/g, '-')
    url = url.replace(/[/]/g, '_')
    url = url.replace(/[=]/g, '')
    return url
  }

  getToken(api_uri, body, iat) {
    body = body || '' // ensure body is defined
    body = typeof body === 'object' ? JSON.stringify(body) : body // verify body is stringified JSON
    const header = this._makeHeader()
    const payload = this._makePayload(api_uri, this.api_identifier, body, iat)
    const signature = this._makeSignature(header, payload, this.api_secret)
    return `MODO2 ${header}.${payload}.${signature}`
  }

  signRequest(api_uri, request, iat) {
    let body = !request.body ? '' : request.body // ensure body is defined
    body = typeof body === 'object' ? JSON.stringify(body) : body // verify body is stringified JSON
    const token = this.getToken(api_uri, body, iat)
    request.headers['Authorization'] = token

    return request
  }
}
