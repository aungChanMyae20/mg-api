require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./server/database/db')
const routes = require('./server/routes')

connectDB()

app.use(express.json())

app.use('/api', routes)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})