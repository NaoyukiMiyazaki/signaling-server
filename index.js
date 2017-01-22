'strict mode'

var WebSocketServer = require('ws').Server
var port = process.env.PORT || 3001
var wsServer = new WebSocketServer({ port: port })
console.log(`websocket server start. port=${port}`)

wsServer.on('connection', ws => {
  console.log('-- websocket connected --')
  ws.on('message', message => {
    wsServer.clients.forEach(client => {
      if (isSame(ws, client)) {
        console.log('- skip sender -')
      } else {
        client.send(message);
      }
    })
  })
})

function isSame(ws1, ws2) {
  // -- compare object --
  return (ws1 === ws2);
}