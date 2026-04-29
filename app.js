const express = require('express')
const path = require('path')
const http = require('http')
const { Server } = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  maxHttpBufferSize: 1e8
})

const PORT = 4000
app.use(express.static(path.join(__dirname, 'public')))
let clients = new Set()

io.on('connection', (socket) => {
  clients.add(socket.id)

  io.emit('clients-total', clients.size)
  socket.on('message', (data) => {

    if (!data.message && !data.file) return
    io.emit('chat-message', {
      name: data.name || 'Anonymous',
      message: data.message || '',
      file: data.file || null,
      fileType: data.fileType || null,
      dateTime: Date.now(),
      socketId: socket.id
    })
    
  })

  socket.on('typing', (name) => {
    socket.broadcast.emit('typing', name)
  })

  socket.on('disconnect', () => {
    clients.delete(socket.id)
    io.emit('clients-total', clients.size)
  })

})

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})

function openImage(src) {
  document.getElementById('image-modal').style.display = 'flex'
  document.getElementById('modal-img').src = src
}

function closeImage() {
  document.getElementById('image-modal').style.display = 'none'
}