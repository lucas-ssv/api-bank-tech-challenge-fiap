require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT

app.get('/', (req, res) => {
  return res.send('Hello World!!')
})

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`)
})
