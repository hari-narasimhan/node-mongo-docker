'use strict'
const Employee = require('../models/employee')
const listEmployees = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          result: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                _id: {
                  type: 'string'
                },
                name: {
                  type: 'string'
                },
                age: {
                  type: 'string'
                }
              }
            }

          }
        }
      }
    }
  }
}

const createEmployee = {
  schema: {
    body: {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        age: {
          type: 'number'
        }
      },
      required: ['name']
    },
    response: {
      201: {
        type: 'object',
        properties: {
          _id: {
            type: 'string'
          }
        }
      }
    }
  }
}

const updateEmployee = {
  schema: {
    body: {
      type: 'object',
      properties: {
        age: {
          type: 'number'
        }
      },
      required: ['age']
    }
  }
}

async function routes (fastify, options) {
  fastify.get('/employees', {
    schema: listEmployees.schema,
    preValidation: [fastify.authenticate]
  }, async (req, res) => {
    const result = await Employee.list({ db: req._ctx.db }) // req._ctx.coll.find().toArray()
    return {
      result
    }
  })

  fastify.get('/employees/:id', async (req, res) => {
    const id = req.params.id
    const result = await req._ctx.coll.findOne({
      _id: fastify.mongo.ObjectId(id)
    })
    return result
  })

  fastify.delete('/employees/:id', async (req, res) => {
    const id = req.params.id
    const result = await req._ctx.coll.findOneAndDelete({
      _id: fastify.mongo.ObjectId(id)
    })
    return result
  })

  fastify.put('/employees/:id', updateEmployee, async (req, res) => {
    const id = req.params.id
    const employee = req.body
    const result = await req._ctx.coll.findOneAndUpdate({
      _id: fastify.mongo.ObjectId(id)
    }, {
      $set: employee
    })
    return result
  })

  fastify.post('/employees', createEmployee, async (req, res) => {
    const employee = req.body
    const result = await req._ctx.coll.insertOne(employee)
    // Created
    res.code(201)
    return {
      _id: result.insertedId
    }
  })
}

module.exports = routes
