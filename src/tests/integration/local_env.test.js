import Modo2Auth from '../../index'
import { mockCreds } from '../../mocks'
import fetch from 'node-fetch'

describe('integration', () => {
  it('should return a 200 when requesting to a local Payout server', async () => {
    const modo2Auth = new Modo2Auth(mockCreds)
    const api_uri = '/vault/public_key'
    const api_host = 'http://localhost:90'
    try {
      const resp = await fetch(`${api_host}${api_uri}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: modo2Auth.getToken(api_uri),
        },
      })
      const text = await resp.text()

      expect(resp.status).toBe(200)
      expect(text.includes('BEGIN PUBLIC KEY')).toBe(true)
    } catch (error) {
      expect(error).toBeNull()
    }
  })
  it('should return a 200 when requesting to a local Checkout server', async () => {
    const modo2Auth = new Modo2Auth(mockCreds)
    const api_host = 'http://localhost:82'
    const api_uri = '/v2/vault/public_key'

    try {
      const resp = await fetch(`${api_host}${api_uri}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: modo2Auth.getToken(api_uri),
        },
      })
      const text = await resp.text()

      expect(resp.status).toBe(200)
      expect(text.includes('BEGIN PUBLIC KEY')).toBe(true)
    } catch (error) {
      expect(error).toBeNull()
    }
  })
})
