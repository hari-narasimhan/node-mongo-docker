'use strict'
const MODEL = 'employees'

const list = (ctx) => {
  console.log('MODEL::list', MODEL)
  return ctx.db.collection(MODEL).find().toArray()
}

module.exports = {
  list
}
