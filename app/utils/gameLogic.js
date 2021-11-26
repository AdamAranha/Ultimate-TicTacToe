
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
        // this.overBoardWin = false;
        // this.winCondition = 'none';
        this.currentPlayer = player1;
        this.winner
    }

    logPlayers() {
        return (`Player 1:${this.player1}\nPlayer 2:${this.player2}`);
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
///////////////////////////////FUNCTIONS/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getTurn(room) {
    room.turn % 2 === 1 ? room.currentPlayer = room.player1 : room.currentPlayer = room.player2;
    console.log(`We are on turn ${room.turn + 1}, it is currently ${room.currentPlayer === room.player1 ? room.player2 : room.player1}'s turn`);

    return room.currentPlayer
}

function setPosition(room, position) {
    let wasPlaced;
    const xCord = sectionArray.indexOf(position[0]);
    const yCord = position[2];

    getTurn(room);

    if (room.gameBoard[xCord][yCord] === 0) {

        wasPlaced = true;
        if (room.currentPlayer === room.player1) {
            room.gameBoard[xCord][yCord] = 1;

        } else {
            room.gameBoard[xCord][yCord] = 2;
        }
        room.turn++;
        // this.checkForSectionWin()
    } else { wasPlaced = false; }

    return {
        newBoardState: room.gameBoard,
        wasPlaced
    };
}

function checkForWin(array) {
    // let currentPlayerMarker = room.currentPlayer === room.player1 ? 1 : 2
    let didWin = false;
    let winCondition = 'none';
    let winner;
    function shortCut(num1, num2, num3, players) {
        return (
            array[num1] === array[num2] &&
            array[num2] === array[num3] &&
            array[num3] === players
        )
    }
    for (let players = 1; players < 3; players++) {
        if (shortCut(0, 1, 2, players)) { didWin = true; winCondition = 'h-top', winner = players }
        if (shortCut(3, 4, 5, players)) { didWin = true; winCondition = 'h-mid', winner = players }
        if (shortCut(6, 7, 8, players)) { didWin = true; winCondition = 'h-bot', winner = players }

        if (shortCut(0, 3, 6, players)) { didWin = true; winCondition = 'v-left', winner = players }
        if (shortCut(1, 4, 7, players)) { didWin = true; winCondition = 'v-mid', winner = players }
        if (shortCut(2, 5, 8, players)) { didWin = true; winCondition = 'v-right', winner = players }

        if (shortCut(0, 4, 8, players)) { didWin = true; winCondition = 'd-ltr', winner = players }
        if (shortCut(2, 4, 6, players)) { didWin = true; winCondition = 'd-rtl', winner = players }
        if (!array.includes(0)) { didWin = true; winCondition = 'tie', winner = 'tie' }
    }
    return {
        state: didWin,
        winCondition,
        winner

    };
}

function checkForSectionWin(room) {
    let overBoardWin = false;
    let thisWinner;
    let currentPlayerMarker = room.currentPlayer === room.player1 ? 1 : 2
    let sectionWon = false;
    let thisWinCondition;
    room.gameBoard.forEach((section, sectionIndex) => {

        if (room.excludeArray.includes(sectionIndex)) return;
        const { state, winner } = checkForWin(section);
        if (state) {
            room.winArray[sectionIndex] = winner;
            room.excludeArray.push(sectionIndex);
            thisWinner = winner;
        }
    })
    const { state, winCondition } = checkOveralWin(room.winArray);
    if (state) {
        overBoardWin = true,
            thisWinCondition = winCondition
    }

    return {
        winArray: room.winArray,
        winCondition: thisWinCondition,
        overBoardWin,
        winner: thisWinner
    }
}

function checkOveralWin(array) {
    const { state, winCondition } = checkForWin(array)
    return { state, winCondition };
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
        // const currentRoom, { gameBoard } = findRoom(id);
        // const thisGameBoard = checkForSectionWin(currentRoom);

        return checkForSectionWin(findRoom(id));
    },

    compsTurn: function (id) {
        // ---------------------RANDOM AI---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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
        let tempRoom = findRoom(id)
        const {
            gameBoard,
            player1,
        } = tempRoom;

        let theAI;
        let thePlayer;
        let counter = 0;
        if (player1 === 'Program') {
            theAI = 1;
            thePlayer = 2;
        } else {
            theAI = 2;
            thePlayer = 1;
        }


        let bestScore = -Infinity;
        let bestMove;

        let setDepth = 50;




        gameBoard.forEach((section, sectionIndex) => {
            section.forEach((square, squareIndex) => {
                if (square === 0) {
                    gameBoard[sectionIndex][squareIndex] = theAI;
                    let score = minimax(gameBoard, setDepth, -Infinity, Infinity, false);
                    gameBoard[sectionIndex][squareIndex] = 0;
                    //

                    //
                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = `${sectionArray[sectionIndex]}-${squareIndex}`
                    }
                }
            })
        })
        console.log(`Calculated ${counter} possiblities, the best move is ${bestMove}`);

        return this.requestPosition(bestMove, id).newBoardState

        function minimax(board, depth, alpha, beta, isMaximizing) {
            let returnScore;
            // const { overBoardWin, winner } = findRoom(id);
            // winner === program
            const { state, winner } = checkForSectionWin(tempRoom)

            if (depth === 0 || state) {
                counter++;

                tempRoom.winArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                tempRoom.excludeArray = [];
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
                console.log(returnScore)
                return returnScore;
            }

            if (isMaximizing) {
                let maxEval = -Infinity;
                board.forEach((section, sectionIndex) => {
                    section.forEach((square, squareIndex) => {
                        if (square === 0) {
                            board[sectionIndex][squareIndex] = theAI;
                            let eval = minimax(board, depth - 1, alpha, beta, false);
                            board[sectionIndex][squareIndex] = 0;
                            maxEval = Math.max(eval, maxEval)
                            alpha = Math.max(alpha, eval);
                            if (beta <= alpha) return;
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
                            let eval = minimax(board, depth - 1, alpha, beta, true);
                            board[sectionIndex][squareIndex] = 0;
                            minEval = Math.min(eval, minEval)
                            alpha = Math.max(alpha, eval);
                            if (beta <= alpha) return;
                        }
                    })
                })
                return minEval
            }
        }



        //---------------------MINIMAX AI---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    },

    requestPosition: function (position, id) {
        const { newBoardState, wasPlaced } = setPosition(findRoom(id), position);

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