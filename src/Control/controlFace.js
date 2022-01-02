import React, {useContext} from "react";
import {Context} from "../index";


export const ControlFace = (props) => {

    const {device} = useContext(Context)

    if(device.faceControl === true) {

        switch (props.route) {
            case 'Up':
                controlFaceUpDown('-1')
                break
            case 'Down':
                controlFaceUpDown('1')
                break
            case 'Left':
                controlFaceLeftRight('-1')
                break
            case 'Right':
                controlFaceLeftRight('1')
                break
            case 'Stop':
                controlFaceStop()
                break;
        }

    }

    function controlFaceUpDown(data) {
            device.webSocket.send(JSON.stringify({
                method: 'messages',
                id: '1',
                date: Date.now(),
                message2: data,
            }))
        }

    function controlFaceLeftRight(data) {
        device.webSocket.send(JSON.stringify({
            method: 'messages',
            id: '1',
            date: Date.now(),
            message: data,
        }))
    }

    function controlFaceStop() {
        device.webSocket.send(JSON.stringify({
            method: 'messages',
            id: '1',
            date: Date.now(),
            message: '0',
            message2: '0',
        }))
    }

    return(
        <div>
            {/*{props.name}*/}
        </div>
    )
}




