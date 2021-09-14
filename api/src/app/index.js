'use strict'

const fastify = require('fastify')
const fastifyEnv = require('fastify-env')

const envSchema = {
  type: 'object',
  required: ['AUTH_SECRET', 'MONGO_DB_URL', 'PORT'],
  properties: {
    MONGO_DB_URL: {
      type: 'string'
    },
    AUTH_SECRET: {
      type: 'string'
    },
    PORT: {
      type: 'number'
    }
  }
}

const envOptions = {
  confKey: 'config',
  schema: envSchema,
  dotenv: true,
  data: process.env
}

async function build (opts = {}) {
  const app = fastify(opts)
  try {
    app.register(fastifyEnv, envOptions)
    // wait for the environment to be fully loaded
    await app.after()

    const dbConnector = require('../plugins/db')
    const baseRoutes = require('../routes/base')

    // const db = require('./db')
    app.register(dbConnector, { url: app.config.MONGO_DB_URL, tenant: 'erp' })
    await app.after()
    app.register(require('../plugins/auth')(app.config.AUTH_SECRET))
    // app.register(require('../plugins/context')({ works: true }))

    // health check
    app.register(require('../plugins/healthCheck'))
    // Register routes
    app.register(baseRoutes, { prefix: '/v1' })
    app.register(require('../routes/employees'), { prefix: '/v1' })

    // await app.listen(app.config.PORT, '0.0.0.0')
    // console.log('server running in port 4040')
  } catch (err) {
    console.log(err)
    app.log.error(err)
    // process.exit(1)
  }
  return app
}

module.exports = build
