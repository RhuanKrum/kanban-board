const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors')
const router = require('./router')

const { addSticker , deleteSticker, getSticker, getAllStickers, updateSticker } = require('./stickers')
const { getAllLanes } = require('./lanes')

const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(router)
app.use(cors())

io.on('connection', (socket) => {
    console.log(`new connection from ${socket.id}`)

    socket.emit('update-all-lanes', getAllLanes())

    socket.on('get-all-stickers', async () => {
        const stickers = await getAllStickers()
        socket.emit('update-all-stickers', stickers)
    })
    
    socket.on('get-all-lanes', async () => {
        socket.emit('update-all-lanes', getAllLanes())

        const stickers = await getAllStickers()
        socket.emit('update-all-stickers', stickers)
    })

    socket.on('add-sticker', async (laneId) => {
        await addSticker(laneId)

        const stickers = await getAllStickers()
        socket.broadcast.emit('update-all-stickers', stickers)
        socket.emit('update-all-stickers', stickers)
    })

    socket.on('update-sticker', async (id, text) => {
        await updateSticker(id, text)
        
        const stickers = await getAllStickers()

        socket.broadcast.emit('update-all-stickers', stickers)
    })

    socket.on('delete-sticker', async (id) => {
        await deleteSticker(id)

        const stickers = await getAllStickers()

        socket.broadcast.emit('update-all-stickers', stickers)
        socket.emit('update-all-stickers', stickers)
    })

    socket.on('move-sticker-right', async (stickerToMove) => {
        const sticker = await getSticker(stickerToMove.id)

        if (sticker) {
            sticker.laneId += 1

            await updateSticker(sticker)

            const stickers = await getAllStickers()

            socket.broadcast.emit('update-all-stickers', stickers)
            socket.emit('update-all-stickers', stickers)
        }
    })

    socket.on('move-sticker-left', async (stickerToMove) => {
        const sticker = await getSticker(stickerToMove.id)

        if (sticker) {
            sticker.laneId -= 1

            await updateSticker(sticker)
            
            const stickers = await getAllStickers()

            socket.broadcast.emit('update-all-stickers', stickers)
            socket.emit('update-all-stickers', stickers)
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
