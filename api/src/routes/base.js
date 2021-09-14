async function routes (fastify, options) {
  fastify.get('/', async (req, res) => {
    return { hello: 'world' }
  })

  fastify.get('/ping', async (req, res) => {
    const db = fastify.mongo.client.db('admin')
    const result = await db.command({ ping: 1 })
    return { result }
  })
}

module.exports = routes
