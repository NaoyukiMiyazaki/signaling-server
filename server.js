'use strict'

const express = require('express')
const http = require("http")
const SocketServer = require('ws').Server
const PORT = process.env.PORT || 3001

const app = express()
app.use(express.static(__dirname + '/'))

const server = http.createServer(app)
server.listen(PORT)

const wss = new SocketServer({ server })
console.log('websocket server start')

wss.on('connection', (ws) => {
  console.log('Client connected')
  ws.on('message', message => {
    wss.clients.forEach(client => {
      if (isSame(ws, client)) {
        console.log('- skip sender -')
      } else {
        client.send(message)
      }
    })
  })
  ws.on('close', () => console.log('Client disconnected'))
});

function isSame(ws1, ws2) {
  // -- compare object --
  return (ws1 === ws2);
}