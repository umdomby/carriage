

export const LeftRight = (webSocket, data, accel) => {
    webSocket.send(JSON.stringify({
        method: 'messages',
        id: '1',
        date: Date.now(),
        message: data,
        accel: accel
    }))
}

export const UpDown = (webSocket, data, accel) => {
    webSocket.send(JSON.stringify({
        method: 'messages',
        id: '1',
        date: Date.now(),
        message2: data,
        accel: accel
    }))
}

export const Stop = (webSocket, accel) => {
    webSocket.send(JSON.stringify({
        method: 'messages',
        id: '1',
        date: Date.now(),
        message: '0',
        message2: '0',
        accel: accel

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


