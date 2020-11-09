require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const { connect: connectToDB } = require('./models')
const Event = require('./models/Event')

const app = express()

app.use(bodyParser.json())

app.get('/events', async (req, res)=>{
  const events = await Event.find({})
  res.json(events)
})
app.use('/graphql', graphqlHTTP({
  schema: buildSchema(`
    type Event {
      _id: ID!
      title: String!
      desctiption: String!
      price: Float!
      date: String!
    }

    input EventInput {
      title: String!
      desctiption: String!
      price: Float!
      date: String!
    }

    type RootQuery {
      events: [Event!]!
    }

    type RootMutation {
      createEvent(eventInput: EventInput): Event
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    events: async () => await Event.find(),
    createEvent: async ({eventInput: {title, desctiption, price, date}}) => {
      const event = await Event.create({
        title,
        desctiption,
        price,
        date,
      })
      return event
    },
  },
  graphiql: true
}))



connectToDB().then(isConnectedToDB => {
  if(!isConnectedToDB) throw new Error('Cannot connect to DB')
  console.log('Connected to DB');
  app.listen(3000, () => console.log('Running on port 3000'))
})
