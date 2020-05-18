import React, { useState, useEffect } from 'react'
import { CardGroup } from 'react-bootstrap'
import io from 'socket.io-client'

import Lane from '../Lane/Lane'

import { getEndpoint } from '../../config/EndpointConfig'

import './Board.css'

let socket

const Board = () => {
    const ENDPOINT = getEndpoint()
    const [lanes, setLanes] = useState()

    useEffect(() => {
        socket = io(ENDPOINT)
        socket.emit('join')

        return () => {
            socket.emit('disconnect')
            socket.off()
        }
    }, [ENDPOINT]) 

    useEffect(() => {
        socket.on('refresh-all-lanes', (lanes) => {
            setLanes(lanes)
            buildLanes()

            socket.emit('get-all-stickers')
        })

        socket.on('refresh-lane', (dirtyLane) => {
            let laneToUpdate = lanes.find((lane) => lane.id === dirtyLane.id)
            if (!laneToUpdate) {
                console.log(`Error updating lane ${dirtyLane.id}. This lane does not exist`)
            }
            else {
                const index = lanes.indexOf(laneToUpdate)
                lanes[index] = dirtyLane
                buildLanes()
            }
        })
    })

    const buildLanes = () => {
        const lanesComponent = []

        if (!lanes) {
            console.log('No lanes to build yet.. waiting for server')
            return 
        }

        lanes.map((lane) => lanesComponent.push(
            <Lane 
                key={lane.id}
                lane={lane}
                stickers={lane.stickers} 
                colourVariant={lane.colourVariant}
                socket={socket} />
        ))
        return lanesComponent
    }

    return (
        <CardGroup>
            {buildLanes()}
        </CardGroup>
    )
}

export default Board