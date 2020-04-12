const stickers = []

// sticker => id, text, laneId

const getNextStickerId = () => {
    if (!stickers.length) {
        return 1
    }

    return Math.max.apply(Math, stickers.map((sticker) => sticker.id)) + 1
}

const addSticker = ({ laneId }) => {
    const stickerId = getNextStickerId()
    console.log(`new stickerId: ${stickerId}`)
    stickers.push({ id: stickerId, text: '', laneId: laneId })
}

const deleteSticker = (id) => {
    const index = stickers.findIndex((sticker) => sticker.id === id)

    if (index !== -1) {
        return stickers.splice(index, 1)[0]
    }
}

const getSticker = (id) => stickers.find((s) => s.id === id)

const getStickers = (laneId) => stickers.find((s) => s.laneId === laneId)

const getAllStickers = () => stickers

const updateSticker = (stickerToUpdate) => {
    const sticker = stickers.find((s) => s.id === stickerToUpdate.id)

    if (sticker) {
        sticker.text = stickerToUpdate.text
        sticker.laneId = stickerToUpdate.laneId
    }
}

module.exports = { addSticker , deleteSticker, getSticker, getStickers, getAllStickers, updateSticker }