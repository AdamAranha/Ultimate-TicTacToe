const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

const PORT = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, '../client/build')));

io.on('connection', (socket) => {
    socket.emit('id', socket.id)
    console.log('New User connected')
    // socket.join(uuidv4())
    console.log(socket.id)
    console.log(socket.rooms)
})

http.listen(PORT, () => { console.log('Listening on http://localhost:5000') })