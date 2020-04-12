const lanes = []

lanes.push({ id: "1", name: "Backlog", stickers: [], colourVariant: "Primary" })
lanes.push({ id: "2", name: "In Progress", stickers: [], colourVariant: "Secondary" })
lanes.push({ id: "3", name: "Peer Review", stickers: [], colourVariant: "Warning" })
lanes.push({ id: "4", name: "Test", stickers: [], colourVariant: "Info" })
lanes.push({ id: "5", name: "Done", stickers: [], colourVariant: "Success" })
lanes.push({ id: "6", name: "Blocked", stickers: [], colourVariant: "Danger" })

const getAllLanes = () => lanes

module.exports = { getAllLanes }