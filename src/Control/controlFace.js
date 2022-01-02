import React, {useContext} from "react";
import {Context} from "../index";
import {LeftRight, Stop, UpDown} from "./controlVoceButton";


export const ControlFace = (props) => {

    const {device} = useContext(Context)

    if(device.faceControl === true) {

        switch (props.route) {
            case 'Up':
                UpDown(device.webSocket, '-1', device.accel)
                //controlFaceUpDown('-1')
                break
            case 'Down':
                UpDown(device.webSocket, '1', device.accel)
                //controlFaceUpDown('1')
                break
            case 'Left':
                LeftRight(device.webSocket, '-1', device.accel)
                //controlFaceLeftRight('-1')
                break
            case 'Right':
                LeftRight(device.webSocket, '1', device.accel)
                //controlFaceLeftRight('1')
                break
            case 'Stop':
                Stop(device.webSocket, 1)
                //controlFaceStop()
                break;
        }

    }

    // function controlFaceUpDown(data) {
    //         device.webSocket.send(JSON.stringify({
    //             method: 'messages',
    //             id: '1',
    //             date: Date.now(),
    //             message2: data,
    //         }))
    //     }
    //
    // function controlFaceLeftRight(data) {
    //     device.webSocket.send(JSON.stringify({
    //         method: 'messages',
    //         id: '1',
    //         date: Date.now(),
    //         message: data,
    //     }))
    // }
    //
    // function controlFaceStop() {
    //     device.webSocket.send(JSON.stringify({
    //         method: 'messages',
    //         id: '1',
    //         date: Date.now(),
    //         message: '0',
    //         message2: '0',
    //     }))
    // }

    return(
        <div>
            {/*{props.name}*/}
        </div>
    )
}




