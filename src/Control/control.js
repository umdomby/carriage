

export const LeftRight = (webSocket, data) => {
    webSocket.send(JSON.stringify({
        method: 'messages',
        id: '1',
        date: Date.now(),
        message: data,
    }))
}

export const UpDown = (webSocket, data) => {
    webSocket.send(JSON.stringify({
        method: 'messages',
        id: '1',
        date: Date.now(),
        message2: data,
    }))
}

export const Stop = (webSocket) => {
    webSocket.send(JSON.stringify({
        method: 'messages',
        id: '1',
        date: Date.now(),
        message: '0',
        message2: '0',
    }))
}


