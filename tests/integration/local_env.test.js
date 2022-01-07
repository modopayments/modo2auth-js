const Modo2Auth = require('../../src/index')
const { mockCreds } = require('../../mocks')
const fetch = require('node-fetch')

describe('integration', () => {
  jest.setTimeout(60000)

  describe('checkout', () => {
    const api_host = 'http://localhost:82' // local checkout server

    it('POST: /v3/checkout/list', async () => {
      const modo2Auth = new Modo2Auth(mockCreds)
      const api_uri = '/v3/checkout/list'
      const body = {
        start_date: '2020-05-01T00:00:00Z',
        end_date: '2020-05-26T00:00:00Z',
      }

      try {
        const resp = await fetch(`${api_host}${api_uri}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: modo2Auth.getToken(api_uri, body),
          },
          body: JSON.stringify(body),
        })
        const text = await resp.text()

        expect(resp.status).toBe(200)
        expect(text.length)
        // expect(text.includes('BEGIN PUBLIC KEY')).toBe(true)
      } catch (error) {
        expect(error).toBeNull()
      }
    })
  })
})
