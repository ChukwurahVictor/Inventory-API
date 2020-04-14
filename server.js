const express = require('express')
const mongoose = require('mongoose')
const expressGraphQL = require('express-graphql')
const schema = require('./schema.js')

const app = express()

//setup database
mongoose.connect('mongodb://localhost:27017/inventory_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {console.log('Connected to database...')
})
.catch('error', (error) => {
    console.error(error)
})

//set route and use graphiql
app.use('/graphql', expressGraphQL ({
    schema: schema,
    graphiql: true
}))

//port listener
app.listen(8080, () => {
    console.log('Server started on port 8080')
})