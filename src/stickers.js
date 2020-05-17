const Sticker = require('./models/Sticker')

const addSticker = async (laneId) => {
    await Sticker.create({
        text: "",
        laneId: laneId
    }).then(sticker => console.log(`sticker created: '${sticker.id}'`))
    .catch(err => console.log(err))
}

const deleteSticker = async (id) => {
    await Sticker.destroy({
        where: {
            id: id
        }
    }).catch(err => console.log(err))
}

const getSticker = async (id) => await Sticker.findOne({
    where: {
        id: id
    }
})

const getStickers = async (laneId) => await Sticker.findAll({
    where: {
        laneId: laneId
    }
})

const getAllStickers = async () => await Sticker.findAll()

const updateSticker = async (stickerToUpdate) => {
    await Sticker.update({ text: stickerToUpdate.text, laneId: stickerToUpdate.laneId }, {
        where: {
            id: stickerToUpdate.id
        }
    }).then(() => console.log(`sticker ${stickerToUpdate.id} updated`))
    .catch(err => console.log(err))
}

module.exports = { addSticker , deleteSticker, getSticker, getStickers, getAllStickers, updateSticker }