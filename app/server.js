const { checkAvailability, resetBoard } = require('./utils/boardFunc.js')
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
    // socket.join('newRoom')
    io.sockets.to(socket.id).emit('newMessage', 'WE DID IT!!')
    // console.log(io.sockets.adapter.rooms)
    // issocket.to(socket.id).emit('greeting', message)

    socket.on('reset', (position, callback) => {
        const placementArray = resetBoard()
        callback({
            placementArray
        })
    })

    socket.on('disconnect', () => {
        console.log(`User disconnected [${socket.id}]`)
    })

    socket.on('getRooms', (e) => {
        // console.log('Redo called')
        console.log(io.sockets.adapter.rooms)
    })

    socket.on('logId', () => {

    })



    socket.on('searchUser', (query) => {
        if (io.sockets.adapter.rooms.has(query)) {
            io.sockets.to(query).emit('joinRequest', socket.id)
            console.log('User found')
        } else { console.log('User not found') }
    })

    socket.on('challengeAccepted', (values) => {
        socket.join(values.challenger)
        socket.leave(socket.id)

        startGame(io.sockets.adapter.rooms.get(values.challenger))
    })


    // socket.on('requestPosition', (position, callback) => {
    //     console.log(`Requesting placement at [${position.p1}][${position.p2}]`)
    //     const { placementArray, wasPlaced } = checkAvailability(position)
    //     // io.sockets.to(roomName).emit(currentPlayer, 'removeEventListeners')

    //     callback({
    //         placementArray, wasPlaced
    //     })
    // })







    function readyPlayer(roomName, currentPlayer) {
        //Add event listeners for the currentPlayer
        console.log('Running readyPlayer one ' + roomName + ',' + currentPlayer)
        // socket.emit('id', socket.id)
        // io.sockets.to(roomName).emit(socket.id.toString(), 'addEventListeners')
        io.sockets.to(roomName).emit('testBroadcast', {
            currentPlayer,
            command: 'addEventListeners'
        })
        //Wait for click event
        //  Set the board
        //Remove eventListeners

    }

    function startGame(room) {

        let setToArray = [...room]

        let roomName = setToArray[0]
        let coinFlip = Math.round(Math.random());
        let firstPlayer = setToArray[coinFlip];
        setToArray.forEach((item) => item !== firstPlayer ? secondPlayer = item : null)
        let alternate = 0;
        let currentPlayer = firstPlayer;


        console.log(`Gameset,\nRoom Name:[${roomName}]\nFirst Player:[${firstPlayer}]\nSecond Player:[${secondPlayer}]\nCurrent Player:[${currentPlayer}]]`)

        readyPlayer(roomName, currentPlayer)




        socket.on('requestPosition', (position, callback) => {
            console.log(currentPlayer)
            console.log(`Requesting placement at [${position.p1}][${position.p2}]`)
            const { placementArray, wasPlaced } = checkAvailability(position)

            console.log(wasPlaced)
            if (wasPlaced) {
                alternate++
                if (alternate % 2 === 0) {
                    currentPlayer = firstPlayer
                } else {
                    currentPlayer = secondPlayer
                }
                console.log(currentPlayer)
                readyPlayer(roomName, currentPlayer)
            } else {
                console.log('calculating')
            }



            callback({
                placementArray, wasPlaced
            })
        })


    }


})


http.listen(PORT, () => { console.log(`Listening on http://localhost:${PORT}`) })