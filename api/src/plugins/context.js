const fp = require('fastify-plugin')

function setup (config) {
  async function myPlugin (fastify) {
    fastify.addHook('onRequest', async (req, reply) => {
      req._ctx = { db: fastify.mongo.client.db(config.db) }
    })
  }
  return fp(myPlugin)
}

module.exports = setup
