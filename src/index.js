const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors')
const router = require('./router')

const { addSticker , deleteSticker, getAllStickers, updateSticker } = require('./stickers')
const { getAllLanes } = require('./lanes')

const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(router)
app.use(cors())

// const db = require('./config/database')

io.on('connection', (socket) => {
    console.log(`new connection from ${socket.id}`)

    socket.emit('update-all-lanes', getAllLanes())

    socket.on('get-all-stickers', () => {
        socket.emit('update-all-stickers', getAllStickers())
    })
    
    socket.on('get-all-lanes', callback => {
        socket.emit('update-all-lanes', getAllLanes())
        socket.emit('update-all-stickers', getAllStickers())
        callback()
    })

    socket.on('add-sticker', (laneId) => {
        addSticker(laneId)
        socket.broadcast.emit('update-all-stickers', getAllStickers())
        socket.emit('update-all-stickers', getAllStickers())
    })

    socket.on('update-sticker', (id, text) => {
        updateSticker(id, text)
        socket.broadcast.emit('update-all-stickers', getAllStickers())
    })

    socket.on('delete-sticker', (id) => {
        const deletedSticker = deleteSticker(id)

        if (deletedSticker) {
            socket.broadcast.emit('update-all-stickers', getAllStickers())
            socket.emit('update-all-stickers', getAllStickers())
        }
    })

    socket.on('join', () => {
        socket.emit('update-all-lanes', getAllLanes())
    })

    socket.on('disconnect', () => {
        console.log(`user disconnected from ${socket.id}`)
    })
})

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))
