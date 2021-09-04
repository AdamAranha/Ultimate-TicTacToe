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
    socket.emit('starting');
    socket.emit('id', socket.id);
    console.log(`+-------------------------------------------+\n| New User connected [${socket.id}] |`)

    socketId = socket.id;

    // socket.join('newRoom')
    // io.sockets.to(socket.id).emit('newMessage', 'WE DID IT!!')
    // console.log(io.sockets.adapter.rooms)
    // issocket.to(socket.id).emit('greeting', message)
    socket.on('disconnect', () => {
        console.log(`|  User disconnected [${socket.id}] |\n+-------------------------------------------+`)
        gameLogic.removeRoom(socket.id);
    })

    socket.on('startGame', (firstPlayer) => {
        const { room, stored } = gameLogic.newGame(firstPlayer, socket.id)
        if (stored) {
            if (room.player1 != 'Program') {
                socket.emit('command', {
                    command: 'addEventListeners'
                });
            }
        }
        // gameLogic.startGame(socket.id)
        if (room.player1 === 'Program') {
            setTimeout(() => {
                const newBoardState = gameLogic.compsTurn(socket.id);
                const { winArray, overBoardWin, winCondition } = gameLogic.checkForSectionWin(socket.id);
                const boardData = { newBoardState, winArray, overBoardWin, winCondition };

                io.sockets.to(socket.id).emit('gameBoard', boardData);
                socket.emit('command', {
                    command: 'addEventListeners'
                });
            }, 1100);
        }
    })

    socket.on('requestPosition', ({ position, id }, callback) => {
        const { newBoardState, wasPlaced } = gameLogic.requestPosition(position, id);;
        const { winArray, overBoardWin, winCondition } = gameLogic.checkForSectionWin(id);
        const boardData = { newBoardState, winArray, overBoardWin, winCondition }
        io.sockets.to(socket.id).emit('gameBoard', boardData);

        // Then i set a timeout, get the AI position, and send it back
        if (wasPlaced) {
            setTimeout(() => {
                const newBoardState = gameLogic.compsTurn(id);
                const { winArray, overBoardWin, winCondition } = gameLogic.checkForSectionWin(id);
                const boardData = { newBoardState, winArray, overBoardWin, winCondition };
                io.sockets.to(socket.id).emit('gameBoard', boardData);
                socket.emit('command', {
                    command: 'addEventListeners'
                });
            }, 1100);
        }

        callback({
            wasPlaced
        })
    })

    socket.on('test-button', (id) => {
        gameLogic.callObject();
    })

    socket.on('resetBoard', (id) => {
        const gameBoard = gameLogic.resetBoard(id);
        io.sockets.to(socket.id).emit('gameBoard', gameBoard);
    })
})

http.listen(PORT, () => { console.log(`Listening on http://localhost:${PORT}`) })