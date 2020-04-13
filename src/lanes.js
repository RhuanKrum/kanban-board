const lanes = []

lanes.push({ id: 1, name: "Backlog", colourVariant: "Primary" })
lanes.push({ id: 2, name: "In Progress", colourVariant: "Secondary" })
lanes.push({ id: 3, name: "Peer Review", colourVariant: "Warning" })
lanes.push({ id: 4, name: "Test", colourVariant: "Info" })
lanes.push({ id: 5, name: "Done", colourVariant: "Success" })
lanes.push({ id: 6, name: "Blocked", colourVariant: "Danger" })

const getAllLanes = () => lanes

module.exports = { getAllLanes }