import React, { useEffect } from 'react';
import './Board.css'
import boardUtil from './boardUtil.js'// All the Logic is here

export default function Board({ opponent, socket }) {
    // placementArray keeps track of x's and o's on the board
    let socketId = '';
    let isPlayer = true
    let excludeArray = [];
    let gameBoard = [];
    const sectionArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
    let numberArray = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight']
    const realNumberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8]

    useEffect(() => {
        socket.on('id', (id) => {
            socketId = id
            console.log(`Your Socket ID is: ${id}`)
        })

        socket.on('gameBoard', (board) => {

            // console.table(board)
            boardUtil.setBoard(board)
        })

        socket.on('command', (command) => {
            console.log(command)
            switch (command.command) {
                case 'addEventListeners':
                    boardUtil.addEventListeners(socket);
                    break;
                default:
                    break;
            }
        })
    })

    return (
        <div className="bigBoard">
            {sectionArray.map((array, index) => (
                <div id={array} className={`${numberArray[index]}Thick child`} key={array}>
                    <div className="smallBoard-container">
                        {numberArray.map((square, index) => (
                            <div id={array + '-' + realNumberArray[index]} className={`${square} childchild vacant`} key={array + '-' + realNumberArray[index]}
                            // onClick={(event) => {
                            //     boardUtil.registerClick(event, socket)
                            // }}
                            ></div>
                        ))}
                    </div>
                    {/* Win Stuff */}
                    <div className="winX">
                        <p>X</p>
                    </div>
                    <div className="winO">
                        <p>O</p>
                    </div>
                    {boardUtil.strikeThrough(array)}
                    {/* Win Stuff */}
                </div>
            ))}
            <button className='reset-button' onClick={() => {
                socket.emit('test-button', socketId)
            }}> Test Button</button>
            <button className="reset-button" onClick={() => {
                socket.emit('resetBoard', socketId)
            }}>Reset Board</button>
        </div>
    )
}