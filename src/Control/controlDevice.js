import React, {useContext} from "react";
import {Context} from "../index";


export const ControlDevice = (props) => {

    const {device} = useContext(Context)
    if(props.route === 'UpDown') {
        device.webSocket.send(JSON.stringify({
            method: 'messages',
            id: '1',
            date: Date.now(),
            message: props.data,
        }))
    }
    else if(props.route === 'LeftRight') {
        device.webSocket.send(JSON.stringify({
            method: 'messages',
            id: '1',
            date: Date.now(),
            message2: props.data,
        }))
    }
    else if(props.route === 'Stop') {
        device.webSocket.send(JSON.stringify({
            method: 'messages',
            id: '1',
            date: Date.now(),
            message: props.data,
            message2: props.data,
        }))
    }


    return(
        <div>
            {/*{props.name}*/}
        </div>
    )
}

// export default ControlDevice




