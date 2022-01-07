

export const LeftRight = (webSocket, speedLR, accel) => {
    webSocket.send(JSON.stringify({
        method: 'messages',
        message: speedLR,
        accel: accel,
        stop: 0
    }))
}

export const UpDown = (webSocket, speedUD, accel) => {
    webSocket.send(JSON.stringify({
        method: 'messages',
        message2: speedUD,
        accel: accel,
        stop: 0
    }))
}

export const Stop = (webSocket, accel) => {
    webSocket.send(JSON.stringify({
        method: 'messages',
        message: 0,
        message2: 0,
        accel: accel,
        stop: 1
    }))
}

export const DegreeGoBack = (webSocket, speedUD) => {
    webSocket.send(JSON.stringify({
        method: 'degreegoback',
        degreegoback : speedUD
    }))
}





