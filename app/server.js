const { v4: uuidv4 } = require('uuid');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

let placementArray = [];
for (let count = 0; count < 9; count++) {
    placementArray[count] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
}

io.on('connection', (socket) => {
    socket.emit('id', socket.id)
    console.log('New User connected')
    // socket.join(uuidv4())
    console.log(socket.id)
    console.log(socket.rooms)
})

http.listen(5000, () => { console.log('Listening on http://localhost:5000') })