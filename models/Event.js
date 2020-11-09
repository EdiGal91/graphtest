const { model, Schema } = require('mongoose')
const type = require('./typeBuilder')

const eventSchema = new Schema({
  title: type.string.required.build(),
  desctiption: type.string.required.build(),
  price: type.number.required.build(),
  date: type.date.required.build(),
})

module.exports = model('Event', eventSchema);
