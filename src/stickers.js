const stickers = []

// sticker => id, text, laneId

const getNextStickerId = () => {
    if (!stickers.length) {
        return 1
    }

    return Math.max.apply(Math, stickers.map((sticker) => sticker.id)) + 1
}

const addSticker = ({ laneId }) => {
    stickers.push({ id: getNextStickerId(), text: '', laneId: laneId })
}

const deleteSticker = (id) => {
    const index = stickers.findIndex((sticker) => sticker.id === id)

    if (index !== -1) {
        return stickers.splice(index, 1)[0]
    }
}

const getSticker = (id) => stickers.filter((sticker) => sticker.id === id)

const getStickers = (laneId) => stickers.filter((sticker) => sticker.laneId === laneId)

const getAllStickers = () => stickers

const updateSticker = ({ id, text }) => {
    const sticker = stickers.find((s) => s.id === id)

    if (sticker) {
        sticker.text = text
    }
}

module.exports = { addSticker , deleteSticker, getSticker, getStickers, getAllStickers, updateSticker }