
let sectionArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
let roomList = [];

class RoomData {
    constructor(room, player1, player2) {
        this.gameBoard = []
        for (let count = 0; count < 9; count++) {
            this.gameBoard[count] = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        };
        this.turn = 1;
        this.room = room;
        this.winArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.excludeArray = [];
        this.player1 = player1;
        this.player2 = player2;
        this.overBoardWin = false;
        this.winCondition = 'none';
        this.currentPlayer = player1;
    }

    checkForWin(array) {
        let currentPlayerMarker = this.currentPlayer === this.player1 ? 1 : 2
        let didWin = false;
        function shortCut(num1, num2, num3) {
            return (
                array[num1] === currentPlayerMarker &&
                array[num2] === currentPlayerMarker &&
                array[num3] === currentPlayerMarker
            )
        }

        if (shortCut(0, 1, 2)) { didWin = true; this.windCondition = 'h-top' }
        if (shortCut(3, 4, 5)) { didWin = true; this.windCondition = 'h-mid' }
        if (shortCut(6, 7, 8)) { didWin = true; this.windCondition = 'h-bot' }

        if (shortCut(0, 3, 6)) { didWin = true; this.windCondition = 'v-left' }
        if (shortCut(1, 4, 7)) { didWin = true; this.windCondition = 'v-mid' }
        if (shortCut(2, 5, 8)) { didWin = true; this.windCondition = 'v-right' }

        if (shortCut(0, 4, 8)) { didWin = true; this.windCondition = 'd-ltr' }
        if (shortCut(2, 4, 6)) { didWin = true; this.windCondition = 'd-rtl' }
        // console.log(sectionWon, winCondition) 
        return didWin;
    }

    checkForSectionWin() {
        let currentPlayerMarker = this.currentPlayer === this.player1 ? 1 : 2
        let sectionWon = false;
        this.gameBoard.forEach((section, sectionIndex) => {

            if (this.excludeArray.includes(sectionIndex)) return;
            if (this.checkForWin(section)) {
                this.winArray[sectionIndex] = currentPlayerMarker;
                // console.log(`Section[${sectionIndex}] has been won`)
                this.excludeArray.push(sectionIndex);
            }
        })
        this.checkOveralWin();

        return {
            winArray: this.winArray,
            winCondition: this.winCondition,
            overBoardWin: this.overBoardWin
        }
    }

    checkOveralWin() {
        if (this.checkForWin(this.winArray)) this.overBoardWin = true;
    }

    logPlayers() {
        return (`Player 1:${this.player1}\nPlayer 2:${this.player2}`);
    }

    setPosition(position) {
        let wasPlaced;
        const xCord = sectionArray.indexOf(position[0]);
        const yCord = position[2];

        this.getTurn();

        if (this.gameBoard[xCord][yCord] === 0) {

            wasPlaced = true;
            if (this.currentPlayer === this.player1) {
                this.gameBoard[xCord][yCord] = 1;

            } else { this.gameBoard[xCord][yCord] = 2; }
            this.turn++;
            // this.checkForSectionWin()
        } else {
            wasPlaced = false;
        }
        return { newBoardState: this.gameBoard, wasPlaced };
    }

    getTurn() {
        this.turn % 2 === 1 ? this.currentPlayer = this.player1 : this.currentPlayer = this.player2;
        console.log(`We are on turn ${this.turn + 1}, it is currently ${this.currentPlayer === this.player1 ? this.player2 : this.player1}'s turn`);

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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {

    newGame: function (firstPlayer, id) {
        let player1;
        let player2;

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

    checkForSectionWin: function (id) {
        return findRoom(id).checkForSectionWin();
    },

    compsTurn: function (id) {
        let freeArray = [];
        [...findRoom(id).gameBoard].forEach((section, sectionIndex) => {
            section.forEach((square, squareIndex) => {
                if (square === 0) {
                    freeArray.push(`${sectionArray[sectionIndex]}-${squareIndex}`)
                }
            })
        })
        let randomFreeSquare = freeArray[Math.floor(Math.random() * freeArray.length)]
        // const { newBoardState, wasPlaced } = this.requestPosition(randomFreeSquare, id)

        return this.requestPosition(randomFreeSquare, id).newBoardState
    },

    requestPosition: function (position, id) {
        const { newBoardState, wasPlaced } = findRoom(id).setPosition(position);

        return { newBoardState, wasPlaced };
    },

    resetBoard: function (id) {
        return findRoom(id).resetBoard();
    },


    removeRoom: function (room) {
        roomList.splice(roomList.indexOf(room), 1)
    },

    callObject: function (id) {
        // console.log(findRoom(id).logPlayers());
        // findRoom(id).getTurn();
        // console.log(findRoom(id).currentPlayer)
        // console.log(findRoom(id).player1)

        getRoom(id).getTurn();
    }
}