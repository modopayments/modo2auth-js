import {
  makeHeader,
  makePayload,
  makeSignature,
  encodeHash,
  sanitizeString,
} from '../../src/utils'
import { mockCreds } from '../../mocks'

describe('utils', () => {
  const { api_identifier, api_secret } = mockCreds
  const header = makeHeader()
  const api_uri = '/payouts/minimum?action=complete'
  const iat = 1590072685
  const body = JSON.stringify({ someKey: 'someValue' })
  const payload = makePayload(api_uri, api_identifier, body, iat)
  const signature = makeSignature(header, payload, api_secret)

  describe('makeHeader', () => {
    it('should return an encoded header', () => {
      expect(header).toBe('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
    })
  })

  describe('makePayload', () => {
    it('should return an encoded payload', () => {
      expect(payload).toBe(
        'eyJpYXQiOjE1OTAwNzI2ODUsImFwaV9pZGVudGlmaWVyIjoiN2cwVUFwaXBNcHVKMVZPT09IV0pOSVpIN1ZaSU5iMDgiLCJhcGlfdXJpIjoiL3BheW91dHMvbWluaW11bT9hY3Rpb249Y29tcGxldGUiLCJib2R5X2hhc2giOiI0NmI4ZGFkMWM2OWNiZDUwMGU5ZDFmZTJmMmVjZTM1N2M4NGM2ZTM2Y2U3YTg2MGJmMTQ2NzJiNGI3NDBhZjE5In0'
      )
    })
  })

  describe('makeSignature', () => {
    it('should return an encoded signature', () => {
      expect(signature).toBe('lE865md6iVe42QyAGMpcm4bJntMACcDISfCxMrKzOuo')
    })
  })

  describe('encodeHash', () => {
    it('should return a hashed string', () => {
      const data = JSON.stringify({ someKey: 'someValue' })
      const encoded = encodeHash(data)

      expect(encoded).toBe(
        '46b8dad1c69cbd500e9d1fe2f2ece357c84c6e36ce7a860bf14672b4b740af19'
      )
    })
  })

  describe('sanitizeString', () => {
    it('should correctly transform the url', () => {
      const url = 'Test+/=Test+/=Test'
      const sanitized = sanitizeString(url)

      expect(sanitized).toBe('Test-_Test-_Test')
    })
  })
})
