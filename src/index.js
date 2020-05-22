import { makeHeader, makePayload, makeSignature } from './utils'

export default class Modo2Auth {
  constructor({ api_identifier, api_secret }) {
    this.api_identifier = api_identifier
    this.api_secret = api_secret
  }

  getToken(api_uri, body, iat) {
    body = body || '' // ensure body is defined
    body = typeof body == 'object' ? JSON.stringify(body) : body // verify body is stringified JSON
    const header = makeHeader()
    const payload = makePayload(api_uri, this.api_identifier, body, iat)
    const signature = makeSignature(header, payload, this.api_secret)
    return `MODO2 ${header}.${payload}.${signature}`
  }

  signRequest(api_uri, request, iat) {
    let body = !request.body ? '' : request.body // ensure body is defined
    body = typeof body == 'object' ? JSON.stringify(body) : body // verify body is stringified JSON
    const token = this.getToken(api_uri, body, iat)
    request.headers['Authorization'] = token

    return request
  }
}
