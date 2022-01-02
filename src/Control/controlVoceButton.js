

export const LeftRight = (webSocket, data, accel) => {
    webSocket.send(JSON.stringify({
        method: 'messages',
        id: '1',
        date: Date.now(),
        message: data,
        accel: accel,
        stop: 0
    }))
}

export const UpDown = (webSocket, data, accel) => {
    webSocket.send(JSON.stringify({
        method: 'messages',
        id: '1',
        date: Date.now(),
        message2: data,
        accel: accel,
        stop: 0
    }))
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

export const Accel = (webSocket, accel) => {
    webSocket.send(JSON.stringify({
        method: 'messages',
        id: '1',
        date: Date.now(),
        accel: accel
    }))
}


