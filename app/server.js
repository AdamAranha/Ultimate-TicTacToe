const { v4: uuidv4 } = require('uuid');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

const PORT = 5000 || process.env.PORT

let placementArray = [];
for (let count = 0; count < 9; count++) {
    placementArray[count] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
}


app.use(express.static(path.join(__dirname, '../client/build')));

io.on('connection', (socket) => {
    socket.emit('id', socket.id)
    console.log('New User connected')
    // socket.join(uuidv4())
    console.log(socket.id)
    console.log(socket.rooms)
})

http.listen(PORT, () => { console.log('Listening on http://localhost:5000') })