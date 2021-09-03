
let sectionArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
let roomList = [];

class RoomData {
    constructor(player1, player2 = '') {
        this.gameBoard = []
        for (let count = 0; count < 9; count++) {
            this.gameBoard[count] = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
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

function findRoom(room) {
    return roomList.find(({ player1 }) => player1 === room)
}

module.exports = {





    newGame: function (player1) {
        // console.log(`Player connected ${player1}`)
        roomList.push(player1)
        roomList[roomList.indexOf(player1)] = new RoomData(player1)
    },

    requestPosition: function (position, user) {

        return findRoom(user).setPosition(position)
    },

    resetBoard: function (user) {
        return findRoom(user).resetBoard()
    },

    callObject: function (id) {
        // console.log(roomList)
        // console.log(id + 'is a ' + typeof id)
        // console.log(roomList[0].player1 + 'is a ' + typeof roomList[0].player1)
        // console.log(roomList[0].player1 === id)
        console.log(roomList.find(({ player1 }) => player1 === id).player1)


        // return roomList[roomList.indexOf(id)]
    }
}