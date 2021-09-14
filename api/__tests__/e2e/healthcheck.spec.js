let app

beforeAll(async () => {
  app = await require('../../src/app')({
    logger: true
  })
  console.log('Jest E2E starting!')
})

afterAll(async () => {
  // IMPORTANT
  // below line is required to avoid jest open handle error
  await new Promise(resolve => setTimeout(() => resolve(), 500))
  console.log('E2E completed, closed the server')
})

test('health check', async () => {
  const res = await app.inject({
    url: '/healthCheck'
  })

  expect(res.json()).toEqual({ message: 'all is well!' })
})

jest.setTimeout(100000)
