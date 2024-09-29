/* eslint-disable no-undef */
const express = require('express')
const connectToDB = require('./db/db');

connectToDB();
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`tasmanager app listening on https://127.0.0.1:${port}`)
})