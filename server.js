'use strict'

require('dotenv').config()

const bodyParser = require('body-parser')

const express = require('express')

const Figma = require('./lib/figma')
const Twitter = require('./lib/twitter')

const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const PASSCODE = process.env.PASSCODE
const UPDATE_EVENT = 'FILE_VERSION_UPDATE'

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const onPing = (metadata) => {
  metadata.forEach((item) => {
    console.log(item)
    let filename = item.filename

    if (filename.includes('avatar')) {
      Twitter.updateAvatar(filename)
    } else if (filename.includes('banner')) {
      Twitter.updateProfileBanner(filename)
    }

  })
}

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

app.post('/ping', (request, response) => {
  let body = request.body

  if (body && body.passcode === PASSCODE && body.event_type === UPDATE_EVENT) {
    Figma.download(body).then(onPing)
  }
})

http.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + process.env.PORT)
}) 
