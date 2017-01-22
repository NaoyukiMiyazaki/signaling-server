'use strict'

const express = require('express')
const SocketServer = require('ws').Server
const path = require('path')

const PORT = process.env.PORT || 3000
const INDEX = path.join(__dirname, 'index.html')

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

const wss = new SocketServer({ server })

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