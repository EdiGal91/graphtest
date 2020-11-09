const { connect } = require('mongoose')

exports.connect = async () => {
  return connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
         .then(() => true)
         .catch(() => false)
}