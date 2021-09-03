
let sectionArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
let roomList = [];

class RoomData {
    constructor(room, player1, player2) {
        this.gameBoard = []
        for (let count = 0; count < 9; count++) {
            this.gameBoard[count] = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
        this.room = room
        this.player1 = player1
        this.player2 = player2
    }

    logPlayers() {
        return (`Player 1:${this.player1}\nPlayer 2:${this.player2}`)
    }

    setPosition(position) {
        const xCord = sectionArray.indexOf(position[0]);
        const yCord = position[2];

        if (this.gameBoard[xCord][yCord] === 0) {
            this.gameBoard[xCord][yCord] = 1
        }
        return (this.gameBoard)
    }

    resetBoard() {
        for (let count = 0; count < 9; count++) {
            this.gameBoard[count] = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
        return this.gameBoard
    }
}

function findRoom(roomName) {
    return roomList.find(({ room }) => room === roomName)
}


module.exports = {

    newGame: function (firstPlayer, id) {
        let player1;
        let player2;
        // console.log(`Player connected ${player1}`)

        switch (firstPlayer) {
            case 'Player':
                player1 = id;
                player2 = 'Program'
                break;
            case 'Program':
                player1 = 'Program';
                player2 = id;
                break;
            case 'Random':
                let coinFlip = Math.round(Math.random());
                if (coinFlip === 0) {
                    player1 = id; player2 = 'Program'
                } else {
                    player1 = 'Program'; player2 = id
                }
                break;
            default:
                player1 = id;
                player2 = 'Program'
                break;
        }
        roomList.push(id)
        roomList[roomList.indexOf(id)] = new RoomData(id, player1, player2)
        if (findRoom(id)) return true
    },

    requestPosition: function (position, user) {
        return findRoom(user).setPosition(position)
    },

    resetBoard: function (user) {
        return findRoom(user).resetBoard()
    },

    callObject: function (id) {
        console.log(findRoom(id).logPlayers())
    }
}