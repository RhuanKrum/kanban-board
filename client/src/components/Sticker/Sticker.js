import React from 'react'
import { ListGroup, ButtonGroup, Alert } from 'react-bootstrap'

import './Sticker.css'

const Sticker = ({ sticker, colourVariant, socket }) => {

    const updateTextAreaText = (event) => {
        sticker.text = event.target.value
        socket.emit('update-sticker', sticker)
    }

    const deleteSticker = () => {
        socket.emit('delete-sticker', sticker)
    }

    const moveStickerRight = () => {
        if (sticker.laneId < 6) {
            socket.emit('move-sticker-right', sticker)
        }
    }

    const moveStickerLeft = () => {
        if (sticker.laneId > 1) {
            socket.emit('move-sticker-left', sticker)
        }
    }

    return (
        <div className="sticker-container">
            <ListGroup.Item action variant={colourVariant.toLowerCase()}>
                <Alert.Link className="sticker-buttons sticker-delete-button" variant="outline-danger" onClick={() => deleteSticker()}>x</Alert.Link>
                <div className="text-wrap">
                    <textarea className="sticker-textarea" defaultValue={sticker.text} onChange={(event) => updateTextAreaText(event)}/>
                </div>
                <div className="sticker-buttons">
                    <ButtonGroup>
                        <Alert.Link className="sticker-move-button" onClick={() => moveStickerLeft()}>
                            <svg className="bi bi-arrow-left-short" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M7.854 4.646a.5.5 0 010 .708L5.207 8l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z" clipRule="evenodd"/>
                                <path fillRule="evenodd" d="M4.5 8a.5.5 0 01.5-.5h6.5a.5.5 0 010 1H5a.5.5 0 01-.5-.5z" clipRule="evenodd"/>
                            </svg>
                        </Alert.Link>
                        <Alert.Link className="sticker-move-button" onClick={() => moveStickerRight()}>
                            <svg className="bi bi-arrow-right-short" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M8.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L10.793 8 8.146 5.354a.5.5 0 010-.708z" clipRule="evenodd"/>
                                <path fillRule="evenodd" d="M4 8a.5.5 0 01.5-.5H11a.5.5 0 010 1H4.5A.5.5 0 014 8z" clipRule="evenodd"/>
                            </svg>
                        </Alert.Link>
                    </ButtonGroup>
                </div>
            </ListGroup.Item>
        </div>
    )
}

export default Sticker