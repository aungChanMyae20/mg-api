require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const connectDB = require('./server/database/db')
const routes = require('./server/routes')
const bodyParser = require('body-parser')
const cors = require('cors')

connectDB()

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'client', 'build')))

app.use(cors())

app.use('/api', routes)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})