const { checkAvailability } = require('./utils/boardFunc.js')
const express = require('express');
const app = express();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})
const PORT = process.env.PORT || 5000
const STATIC_PATH = process.env.ENV === 'production' ? path.join(__dirname, '../client/build') : path.join(__dirname, '../client/public')

let placementArray = [];
for (let count = 0; count < 9; count++) {
    placementArray[count] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
}

app.use(express.static(path.join(__dirname, '../client/build')));

if (process.env.ENV === 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    })
    console.log('Make sure the react build is up to date!!')
}

io.on('connection', (socket) => {
    socket.emit('id', socket.id)
    console.log('New User connected')

    socket.on('requestPosition', (position, callback) => {
        console.log(position)
        const { placementArray, wasPlaced } = checkAvailability(position)
        callback({
            placementArray, wasPlaced
        })
    })
})

http.listen(PORT, () => { console.log(`Listening on http://localhost:${PORT}`) })