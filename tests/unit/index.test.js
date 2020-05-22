import Modo2Auth from '../../src/index'
import { MockRequest, mockCreds } from '../../mocks'

describe('Modo2Auth', () => {
  let modo2Auth = new Modo2Auth(mockCreds)
  const api_uri = '/test'
  const iat = 1590072685
  const body = { someKey: 'someValue' }

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
