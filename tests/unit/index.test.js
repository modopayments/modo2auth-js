const Modo2Auth = require('../../src/index')
const { MockRequest, mockCreds } = require('../../mocks')

describe('Modo2Auth', () => {
  let modo2Auth = new Modo2Auth(mockCreds)
  const api_uri = '/test'
  const iat = 1590072685
  const body = { someKey: 'someValue' }

  describe('API', () => {
    describe('constructor', () => {
      it('should create an instance of Modo2Auth', () => {
        expect(modo2Auth.constructor.name).toBe('Modo2Auth')
      })
    })

    describe('getToken', () => {
      const expected =
        'MODO2 eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTAwNzI2ODUsImFwaV9pZGVudGlmaWVyIjoiN2cwVUFwaXBNcHVKMVZPT09IV0pOSVpIN1ZaSU5iMDgiLCJhcGlfdXJpIjoiL3Rlc3QiLCJib2R5X2hhc2giOiI0NmI4ZGFkMWM2OWNiZDUwMGU5ZDFmZTJmMmVjZTM1N2M4NGM2ZTM2Y2U3YTg2MGJmMTQ2NzJiNGI3NDBhZjE5In0.sWjjz_MpnSv8Z31gNpEm1cmDhN7MK7Z3ix61RbDRL7g'
      it('should return a MODO2 auth token (body as object)', () => {
        const token = modo2Auth.getToken(api_uri, body, iat)

        expect(token).toBe(expected)
      })
      it('should return a MODO2 auth token, (body as string)', () => {
        const token = modo2Auth.getToken(api_uri, JSON.stringify(body), iat)

        expect(token).toBe(expected)
      })
    })

    describe('signRequest', () => {
      const expected =
        'MODO2 eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTAwNzI2ODUsImFwaV9pZGVudGlmaWVyIjoiN2cwVUFwaXBNcHVKMVZPT09IV0pOSVpIN1ZaSU5iMDgiLCJhcGlfdXJpIjoiL3Rlc3QiLCJib2R5X2hhc2giOiI0NmI4ZGFkMWM2OWNiZDUwMGU5ZDFmZTJmMmVjZTM1N2M4NGM2ZTM2Y2U3YTg2MGJmMTQ2NzJiNGI3NDBhZjE5In0.sWjjz_MpnSv8Z31gNpEm1cmDhN7MK7Z3ix61RbDRL7g'
      const body = { someKey: 'someValue' }
      it('should add a MODO2 Authorization header to a request (body as object)', () => {
        const request = new MockRequest()
        request.body = body
        const signedRequest = modo2Auth.signRequest(api_uri, request, iat)

        expect(signedRequest.headers['Authorization']).not.toBe(null)
        expect(signedRequest.headers['Authorization']).toBe(expected)
      })
      it('should add a MODO2 Authorization header to a request (body as string)', () => {
        const request = new MockRequest()
        request.body = JSON.stringify(body)
        const signedRequest = modo2Auth.signRequest(api_uri, request, iat)

        expect(signedRequest.headers['Authorization']).not.toBe(null)
        expect(signedRequest.headers['Authorization']).toBe(expected)
      })
    })
  })

  describe('PRIVATE', () => {
    const { api_identifier, api_secret } = mockCreds
    const header = modo2Auth._makeHeader()
    const api_uri = '/payouts/minimum?action=complete'
    const iat = 1590072685
    const bodyString = JSON.stringify(body)
    const encoded = modo2Auth._encodeHash(bodyString)
    const payload = modo2Auth._makePayload(api_uri, api_identifier, bodyString, iat)
    const signature = modo2Auth._makeSignature(header, payload, api_secret)

    describe('_makeHeader', () => {
      it('should return an encoded header', () => {
        expect(header).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
      })
    })

    describe('_makePayload', () => {
      it('should return an encoded payload', () => {
        expect(payload).toBe(
          'eyJpYXQiOjE1OTAwNzI2ODUsImFwaV9pZGVudGlmaWVyIjoiN2cwVUFwaXBNcHVKMVZPT09IV0pOSVpIN1ZaSU5iMDgiLCJhcGlfdXJpIjoiL3BheW91dHMvbWluaW11bT9hY3Rpb249Y29tcGxldGUiLCJib2R5X2hhc2giOiI0NmI4ZGFkMWM2OWNiZDUwMGU5ZDFmZTJmMmVjZTM1N2M4NGM2ZTM2Y2U3YTg2MGJmMTQ2NzJiNGI3NDBhZjE5In0'
        )
      })
    })

    describe('_makeSignature', () => {
      it('should return an encoded signature', () => {
        expect(signature).toBe('lE865md6iVe42QyAGMpcm4bJntMACcDISfCxMrKzOuo')
      })
    })

    describe('_encodeHash', () => {
      it('should return a hashed string', () => {
        expect(encoded).toBe(
          '46b8dad1c69cbd500e9d1fe2f2ece357c84c6e36ce7a860bf14672b4b740af19'
        )
      })
    })

    describe('_sanitizeString', () => {
      it('should correctly transform the url', () => {
        const url = 'Test+/=Test+/=Test'
        const sanitized = modo2Auth._sanitizeString(url)

        expect(sanitized).toBe('Test-_Test-_Test')
      })
    })
  })
})
