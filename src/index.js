const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors')
const router = require('./router')

const { addSticker , deleteSticker, getSticker, getStickers, getAllStickers, updateSticker } = require('./stickers')
const { getAllLanes } = require('./lanes')

const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(router)
app.use(cors())

io.on('connection', (socket) => {
    socket.on('get-all-stickers', async () => {
        const stickers = await getAllStickers()
        socket.emit('refresh-all-stickers', stickers)
    })
    
    socket.on('get-all-lanes', async () => {
        const lanes = getAllLanes()
        socket.emit('refresh-all-lanes', lanes)

        const stickers = await getAllStickers()
        socket.emit('refresh-all-stickers', stickers)
    })

    socket.on('add-sticker', async (laneId) => {
        await addSticker(laneId)

        const stickers = await getStickers(laneId)
        socket.broadcast.emit('refresh-stickers', stickers, laneId)
        socket.emit('refresh-stickers', stickers, laneId)
    })

    socket.on('update-sticker', async (sticker) => {
        await updateSticker(sticker)
        
        const stickers = await getStickers(sticker.laneId)
        socket.broadcast.emit('refresh-stickers', stickers, sticker.laneId)
    })

    socket.on('delete-sticker', async (sticker) => {
        await deleteSticker(sticker.id)

        const stickers = await getStickers(sticker.laneId)

        socket.broadcast.emit('refresh-stickers', stickers, sticker.laneId)
        socket.emit('refresh-stickers', stickers, sticker.laneId)
    })

    socket.on('move-sticker-right', async (stickerToMove) => {
        const sticker = await getSticker(stickerToMove.id)

        if (sticker) {
            sticker.laneId += 1

            await updateSticker(sticker)

            let stickers = await getStickers(sticker.laneId)
            socket.broadcast.emit('refresh-stickers', stickers, sticker.laneId)
            socket.emit('refresh-stickers', stickers, sticker.laneId)

            stickers = await getStickers(sticker.laneId - 1)
            socket.broadcast.emit('refresh-stickers', stickers, sticker.laneId - 1)
            socket.emit('refresh-stickers', stickers, sticker.laneId - 1)
        }
    })

    socket.on('move-sticker-left', async (stickerToMove) => {
        const sticker = await getSticker(stickerToMove.id)

        if (sticker) {
            sticker.laneId -= 1

            await updateSticker(sticker)

            let stickers = await getStickers(sticker.laneId)
            socket.broadcast.emit('refresh-stickers', stickers, sticker.laneId)
            socket.emit('refresh-stickers', stickers, sticker.laneId)

            stickers = await getStickers(sticker.laneId + 1)
            socket.broadcast.emit('refresh-stickers', stickers, sticker.laneId + 1)
            socket.emit('refresh-stickers', stickers, sticker.laneId + 1)
        }
    })

    socket.on('join', () => {
        console.log(`new connection from ${socket.id}`)
        socket.emit('refresh-all-lanes', getAllLanes())
    })

    socket.on('disconnect', () => {
        console.log(`user disconnected from ${socket.id}`)
    })
})

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))
