
let sectionArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
let roomList = [];

class RoomData {
    constructor(room, player1, player2) {
        this.gameBoard = []
        for (let count = 0; count < 9; count++) {
            this.gameBoard[count] = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        };
        this.room = room;
        this.player1 = player1;
        this.player2 = player2;
        this.currentPlayer = player1;
        this.turn = 1;
    }

    logPlayers() {
        return (`Player 1:${this.player1}\nPlayer 2:${this.player2}`);
    }

    setPosition(position) {
        const xCord = sectionArray.indexOf(position[0]);
        const yCord = position[2];

        this.getTurn();

        if (this.gameBoard[xCord][yCord] === 0) {

            if (this.currentPlayer === this.player1) {
                this.gameBoard[xCord][yCord] = 1;
            } else { this.gameBoard[xCord][yCord] = 2; }

            // this.gameBoard[xCord][yCord] = 1;
        }
        return (this.gameBoard);
    }

    increaseTurn() {
        this.turn++;
    }

    getTurn() {
        if (this.turn % 2 === 1) this.currentPlayer = this.player1
        else this.currentPlayer = this.player2

        console.log(`We are on turn ${this.turn}, it is currently ${this.currentPlayer}'s turn`);

        return this.currentPlayer
    }

    resetBoard() {
        for (let count = 0; count < 9; count++) {
            this.gameBoard[count] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        return this.gameBoard;
    }
}

function findRoom(roomName) {
    return roomList.find(({ room }) => room === roomName);
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
                    player1 = id; player2 = 'Program';
                } else {
                    player1 = 'Program'; player2 = id;
                }
                break;
            default:
                player1 = id;
                player2 = 'Program';
                break;
        }
        roomList.push(id);
        roomList[roomList.indexOf(id)] = new RoomData(id, player1, player2);

        if (findRoom(id)) return { room: findRoom(id), stored: true };
    },

    startGame: function (id) {

        // if (findRoom(id).getTurn() === 'Program') {
        //     return
        // }
    },

    compsTurn: function (id) {

        // let freeArray = [...findRoom(id).gameBoard]

        let freeArray = [];
        [...findRoom(id).gameBoard].forEach((section, sectionIndex) => {
            section.forEach((square, squareIndex) => {
                if (square === 0) {
                    freeArray.push(`${sectionArray[sectionIndex]}-${squareIndex}`)
                }
            })
        })
        let randomFreeSquare = freeArray[Math.floor(Math.random() * freeArray.length)]



        // if (freeArray) console.log(freeArray)
        let newGameState = this.requestPosition(randomFreeSquare, id)
        return newGameState

    },

    requestPosition: function (position, id) {
        let newGameState = findRoom(id).setPosition(position);
        findRoom(id).increaseTurn();

        return newGameState
    },

    resetBoard: function (id) {
        return findRoom(id).resetBoard();
    },


    removeRoom: function (room) {
        roomList.splice(roomList.indexOf(room), 1)
    },

    callObject: function (id) {
        // console.log(findRoom(id).logPlayers());
        findRoom(id).getTurn();
        // console.log(findRoom(id).currentPlayer)
        // console.log(findRoom(id).player1)
        let newGameState = this.compsTurn(id)
        return newGameState
    }
}