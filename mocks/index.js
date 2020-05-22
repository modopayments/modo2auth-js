export class MockRequest {
  constructor() {
    this.body = {}
    this.cookies = {}
    this.query = {}
    this.params = {}
    this.headers = { 'Content-Type': 'application/json' }
  }
}

export const mockCreds = {
  api_identifier: '7g0UApipMpuJ1VOOOHWJNIZH7VZINb08',
  api_secret: '20I1s7GH7-pgn9041cgWlBKU8pcA1I4CCNpGuvu_xL4K-GnRSy3Q6IBtA5LYlIjy',
}
