const fastifyPlugin = require('fastify-plugin')

function auth (secret) {
  return fastifyPlugin(async function (fastify, opts) {
    fastify.register(require('fastify-jwt'), {
      secret
    })

    fastify.decorate('authenticate', async function (req, res) {
      try {
        await req.jwtVerify()
      } catch (err) {
        res.send(err)
      }
    })
  })
}

module.exports = auth
