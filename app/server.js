const gameLogic = require('./utils/gameLogic.js')
const express = require('express');
const app = express();
const path = require('path');
const { start } = require('repl');
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: ["http://localhost:3000", "https://ultimate-roshambo.herokuapp.com/"],
        methods: ["GET", "POST"]
    }
})
const PORT = process.env.PORT || 5000
// const STATIC_PATH = process.env.ENV === 'production' ? path.join(__dirname, '../client/build') : path.join(__dirname, '../client/public')
const message = 'Greetings!'


app.use(express.static(path.join(__dirname, '../client/build')));

if (process.env.ENV === 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    })
    console.log('Make sure the react build is up to date!!')
}

io.on('connection', (socket) => {

    socket.emit('id', socket.id)
    console.log(`New User connected [${socket.id}]`)
    gameLogic.newGame(socket.id)

    socketId = socket.id

    // socket.join('newRoom')
    // io.sockets.to(socket.id).emit('newMessage', 'WE DID IT!!')
    // console.log(io.sockets.adapter.rooms)
    // issocket.to(socket.id).emit('greeting', message)



    socket.on('disconnect', () => {
        console.log(`User disconnected [${socket.id}]`)
    })

    socket.on('requestPosition', ({ position, user }) => {
        const gameBoard = gameLogic.requestPosition(position, user)

        io.sockets.to(socket.id).emit('gameBoard', gameBoard)
    })

    socket.on('test-button', (id) => {
        gameLogic.callObject(id)
    })

    socket.on('resetBoard', (id) => {
        const gameBoard = gameLogic.resetBoard(id)

        io.sockets.to(socket.id).emit('gameBoard', gameBoard)
    })
})

http.listen(PORT, () => { console.log(`Listening on http://localhost:${PORT}`) })