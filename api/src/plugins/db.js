const fastifyPlugin = require('fastify-plugin')
const fastifyMongo = require('fastify-mongodb')

async function dbConnector (fastify, options) {
  fastify.register(fastifyMongo, {
    forceClose: true,
    url: options.url
  })

  fastify.addHook('onRequest', async (req, reply) => {
    req._ctx = { db: fastify.mongo.client.db(options.tenant) }
  })
}

module.exports = fastifyPlugin(dbConnector)
