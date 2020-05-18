import React, { useEffect, useState } from 'react'
import { Card, ListGroup } from 'react-bootstrap'

import Sticker from '../Sticker/Sticker'

import './Lane.css'

const Lane = ({ lane, colourVariant, socket }) => {
    let [stickersComponent, setStickersComponent] = useState([])

    const buildStickers = (laneStickers) => {   
        setStickersComponent([])
        laneStickers.forEach(sticker => {
            setStickersComponent(stickersComponent => [...stickersComponent, 
                <Sticker key={sticker.id} 
                        sticker={sticker}
                        colourVariant={colourVariant}
                        socket={socket} />]
            )
        })
        return stickersComponent
    }

    const addSticker = (event) => {
        socket.emit('add-sticker', lane.id)
        event.preventDefault()
    }

    useEffect(() => {
        socket.on('refresh-stickers', (stickers, laneId) => {
            if (laneId !== lane.id) {
                return
            }

            if (stickers && stickers.length) {
                const laneStickers = stickers.filter((sticker) => sticker.laneId === lane.id)
                buildStickers(laneStickers)
            }
            else {
                buildStickers([])
            }
        })
        
        socket.on('refresh-all-stickers', (stickers) => {
            console.log('received refresh-all-stickers')
            if (stickers && stickers.length) {
                const laneStickers = stickers.filter((sticker) => sticker.laneId === lane.id)
                buildStickers(laneStickers)
            }
            else {
                buildStickers([])
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lane, colourVariant, socket])

    return (
        <Card className="text-center">
            <Card.Header as="h5">{lane.name}</Card.Header>
            <ListGroup variant="flush">
                {stickersComponent}
            </ListGroup>
            <Card.Body>
            </Card.Body>
            <Card.Footer>
                <Card.Link href="#" onClick={(event) => addSticker(event)}>Add Sticker</Card.Link>
            </Card.Footer>
        </Card>
    )
}

export default Lane