(function() {
  const host = location.origin.replace(/^http/, 'ws')
  document.querySelector('dd').innerText = host

  const ws = new WebSocket(host)
  ws.onopen = () => {
    console.log('websocket serverと繋がりました')
  }
  ws.onerror = () => {
    alert('websocketのエラーが発生しました。')
  }
  ws.onmessage = () => {
    alert('メッセージを受け取りました。')
  }

  const callBtn = document.getElementById('call')
  callBtn.addEventListener('click', () => {
    ws.send('call')
  })
})()