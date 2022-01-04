

export const LeftRight = (webSocket, speedLR, accel) => {
    setTimeout(() => {
        webSocket.send(JSON.stringify({
            method: 'messages',
            id: '1',
            date: Date.now(),
            message: speedLR,
            accel: accel,
            stop: 0
        }))
    }, 5000);
}

export const UpDown = (webSocket, speedUD, accel) => {
    setTimeout(() => {
        webSocket.send(JSON.stringify({
            method: 'messages',
            id: '1',
            date: Date.now(),
            message2: speedUD,
            accel: accel,
            stop: 0
        }))
    }, 5000);
}

export const Stop = (webSocket, accel) => {
    webSocket.send(JSON.stringify({
        method: 'messages',
        id: '1',
        date: Date.now(),
        message: 0,
        message2: 0,
        accel: accel,
        stop: 1
    }))
}


