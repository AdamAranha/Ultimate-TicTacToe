const express = require('express');
const app = express();
// const PORT = process.env.
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    console.log('New User connected')
})

http.listen(5000, () => { console.log('Listening on http://localhost:5000') })