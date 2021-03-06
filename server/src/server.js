/** Setup Express server */
const express = require('express')

const app = express()
const port = process.env.PORT || 8081

app.get('/', (_, res) => res.send("I'm alive 🧟‍"))

const server = app.listen(port, () => console.log(`Server is listening on port*${port}`))

/** Setup midi */
const midi = require('midi')
const midiOut = new midi.output()

try {
  midiOut.openPort(0)
} catch (_) {
  midiOut.openVirtualPort('')
}

process.on('SIGTERM', () => midiOut.closePort())

/** Setup socket.io */
const io = require('socket.io')(server)

io.on('connection', socket => {
  console.log(`a user has connected: ${socket.id}`)

  // note
  socket.on('note_on', data => {
    midiOut.sendMessage([data.message, 60, 127])
    socket.emit('played_note_on', { message: data.message })
  })
  socket.on('note_off', data => {
    midiOut.sendMessage([data.message, 60, 0])
    socket.emit('played_note_off', { message: data.message })
  })
})
