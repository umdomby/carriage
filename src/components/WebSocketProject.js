import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Button} from "react-bootstrap";

const WebSocketProject = () => {

    const {device} = useContext(Context)
    const [messagesUpDown, setMessagesUpDown] = useState('');
    const [messagesLeftRight, setMessagesLeftRight] = useState('');
    const [messagesMongo, setMessagesMongo] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(()=>{
        wsConnect('user')
        setInterval(() => socketTest(), 5000)
    },[])

    const wsConnect = (username) => {
        try {
            device.setWebSocket(new WebSocket(process.env.REACT_APP_API_URL_WS))
            device.webSocket.onopen = () => {
                device.webSocket.send(JSON.stringify({
                    username: username,
                    method: "connection",
                }))
            }
            device.webSocket.onmessage = (event) => {
                const a = event.data
                let msg = JSON.parse(event.data)
                const bb= msg.method
                const aad = 0
                if(device.webSocket.readyState !== device.webSocket.CLOSED && device.webSocket.readyState !== device.webSocket.CLOSING) {
                    switch (msg.method) {
                        case "connection":
                            console.log(`пользователь ${msg.username} присоединился`)
                            console.log(msg.txt)
                            break
                        case "online":
                            console.log(`online`)
                            break
                        case "degreegoback":
                            console.log("degreegoback " + msg.degreegoback)
                            break
                        case "messages":
                            console.log("message "+ msg.message + "  message2 " + msg.message2)
                            setMessagesMongo(msg.messages)
                            // for (var i in msg.clientsNoRepeatUsers){
                            //     console.log(msg.clientsNoRepeatUsers[i])
                            // }
                            break
                        default:
                            console.log('default '+ msg)
                    }
                }
            }
        }catch (e) {
            console.log('WebSocket Error ' + e)
        }
    }

    const socketTest = () => {
        if (device.webSocket.readyState === device.webSocket.CLOSED || device.webSocket.readyState === device.webSocket.CLOSING) {
            //if(device.username !== '' && device.connected === true) {
                wsConnect('user')
                console.log('WebSocket reconnected ' + 'user')
            // }else{
            //     //console.log('WebSocket no connected')
            // }
        } else {
            //console.log('WebSocket connected')
        }
    }

    return (
        <div>
            {/*{device.connected ?*/}
            {/*    <div>*/}
            {/*        <div>*/}
            {/*            {onlineUsers.map((online, index) =>*/}
            {/*                <div key={index}>*/}
            {/*                    {'online user: ' + online}*/}
            {/*                </div>*/}
            {/*            )}*/}
            {/*            {'online pc: ' + onlineUsers.length}*/}
            {/*        </div>*/}
            {/*        <div>*/}
            {/*            {Object.keys(messagesMongo).map((item, index) => (*/}
            {/*                <div key={index}>*/}
            {/*                    {'user: ' + messagesMongo[item].user + ' - ' + messagesMongo[item].messages}*/}
            {/*                </div>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    :*/}
            {/*    ''*/}
            {/*}*/}
        </div>
    )
}

export default WebSocketProject
