
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
        let winner;
        function shortCut(num1, num2, num3, players) {
            return (
                array[num1] === currentPlayerMarker &&
                array[num2] === currentPlayerMarker &&
                array[num3] === currentPlayerMarker
            )
        }

        for (let players; players < 3; players++) {
            // if (shortCut(0, 1, 2, players)) { didWin = true; this.winCondition = 'h-top' }
        }

        if (shortCut(0, 1, 2)) { didWin = true; this.winCondition = 'h-top' }
        if (shortCut(3, 4, 5)) { didWin = true; this.winCondition = 'h-mid' }
        if (shortCut(6, 7, 8)) { didWin = true; this.winCondition = 'h-bot' }

        if (shortCut(0, 3, 6)) { didWin = true; this.winCondition = 'v-left' }
        if (shortCut(1, 4, 7)) { didWin = true; this.winCondition = 'v-mid' }
        if (shortCut(2, 5, 8)) { didWin = true; this.winCondition = 'v-right' }

        if (shortCut(0, 4, 8)) { didWin = true; this.winCondition = 'd-ltr' }
        if (shortCut(2, 4, 6)) { didWin = true; this.winCondition = 'd-rtl' }
        if (!array.includes(0)) { didWin = true; this.winCondition = 'tie' }
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
        if (this.checkForWin(this.winArray)) { this.overBoardWin = true; }
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
        } else { wasPlaced = false; }
        return {
            newBoardState: this.gameBoard,
            wasPlaced
        };
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
        //---------------------RANDOM AI---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        // let freeArray = [];
        // [...findRoom(id).gameBoard].forEach((section, sectionIndex) => {
        //     if (findRoom(id).excludeArray.includes(sectionIndex)) return;
        //     section.forEach((square, squareIndex) => {
        //         if (square === 0) {
        //             freeArray.push(`${sectionArray[sectionIndex]}-${squareIndex}`)
        //         }
        //     })
        // })
        // let randomFreeSquare = freeArray[Math.floor(Math.random() * freeArray.length)]

        // return this.requestPosition(randomFreeSquare, id).newBoardState
        //---------------------RANDOM AI---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //---------------------MINIMAX AI---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        let tempBoard = [];
        let player1;
        let player2;
        let theAI;
        let thePlayer;
        let counter;

        let bestScore = -Infinity;
        let bestMove;

        let setDepth = 1

        if (player1 === 'Program') {
            theAI = 1;
            thePlayer = 2;
        } else {
            thePlayer = 1;
            theAI = 2;
        }



        tempBoard.forEach((section, sectionArray) => {
            section.forEach((square, squareIndex) => {
                if (square === 0) {
                    tempBoard[sectionIndex][squareIndex] = theAI;
                    let score = minimax(tempBoard, setDepth, false);
                    tempBoard[sectionIndex][squareIndex] = 0;
                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = `${sectionArray[sectionIndex]}-${squareIndex}`
                    }

                }
            })
        })

        return this.requestPosition(bestMove, id).newBoardState

        function minimax(board, depth, isMaximizing) {
            let returnScore;
            const { overBoardWin, winner } = checkForSectionWin(board);

            if (depth === 0 || overBoardWin) {
                counter++;
                switch (winner) {
                    case 'tie':
                        returnScore = 0.5;
                        break;
                    case theAI:
                        returnScore = depth * depth;
                        break;

                    case thePlayer:
                        returnScore = depth * depth * -1;
                        break;
                }
                return returnScore;
            }

            if (isMaximizing) {
                let maxEval = -Infinity;
                board.forEach((section, sectionIndex) => {
                    section.forEach((square, squareIndex) => {
                        if (square === 0) {
                            board[sectionIndex][squareIndex] = theAI;
                            let eval = minimax(board, depth - 1, false);
                            board[sectionIndex][squareIndex] = 0;
                            maxEval = Math.max(eval, maxEval)
                        }
                    })
                })
                return maxEval
            } else {
                let minEval = Infinity;
                board.forEach((section, sectionIndex) => {
                    section.forEach((square, squareIndex) => {
                        if (square === 0) {
                            board[sectionIndex][squareIndex] = thePlayer;
                            let eval = minimax(board, depth - 1, true);
                            board[sectionIndex][squareIndex] = 0;
                            minEval = Math.min(eval, minEval)
                        }
                    })
                })
                return minEval
            }
        }



        //---------------------MINIMAX AI---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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