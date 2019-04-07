const l = console.log
require('dotenv').config({ path: 'variables.env' })
const express = require('express')
const fs = require('fs')
const http = require('http')
const path = require('path')
const app = new express()
app.set('port', process.env.PORT)
app.set('host', process.env.HOST)
app.use(express.static(path.resolve(__dirname, './public')))

app.get('/0407', (req, res, next) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  fs.readFile('./public/0407/how-browserify-works.html', 'utf-8', (err, data) => {
    if (err) { throw err }
    res.end(data)
  })
})

const run_app = () => {
  const server = app.listen(app.get('port'), app.get('host'), () => {
    const host = server.address().address
    const port = server.address().port
    l(`Server is running on http://${host}:${port}`)
  })
}

run_app();
module.exports = app