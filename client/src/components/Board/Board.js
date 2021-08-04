import React, { useEffect } from 'react';
import './Board.css'
import io from 'socket.io-client';

const socket = io('http://localhost:5000')


export default function Board() {

    useEffect(() => {
        resetBoard();
        socket.on('init', (msg) => {
            console.table(msg)
        })
        socket.on('id', (id) => {
            console.log(id)
        })
        // document.querySelector('.bigBoard').style.pointerEvents = 'none';
        // document.querySelector('.bigBoard').style.pointerEvents = 'auto';
    })
    // placementArray keeps track of x's and o's on the board
    let isPlayer = true
    let excludeArray = [];
    let placementArray = [];
    let overBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let boardArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
    let numberArray = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight']

    //
    function registerClick(event) {

        socket.emit('requestPosition', {
            p1: boardArray.indexOf(event.target.parentNode.parentNode.id),
            p2: numberArray.indexOf(event.target.id),
            currentPlayer: isPlayer ? 2 : 1
        }, function onReturn(response) {
            placementArray = [...response.placementArray]
            setBoard()
            isPlayer = !isPlayer
        })
        //Changes hover effect of square after is occupied
        let classList = document.getElementById(event.target.parentNode.parentNode.id).childNodes[0].childNodes[numberArray.indexOf(event.target.id)].className
        document.getElementById(event.target.parentNode.parentNode.id).childNodes[0].childNodes[numberArray.indexOf(event.target.id)].className = classList.replace('vacant', 'occupied')
    }

    function setBoard() {
        placementArray.forEach((array, arrayIndex) => {
            array.forEach((square, squareIndex) => {
                document.querySelector(`#${boardArray[arrayIndex]}`).childNodes[0].childNodes[squareIndex].innerHTML =
                    square === 0 ? '' : square === 1 ? '<span class="marker">O</span>' : '<span class="marker">X</span>'
            })
        })
        checkSectionWin()
    }

    function resetBoard() {
        //Removes hover effects and function from all squares because im paranoid and think I'll have duplicates if I don't
        document.getElementById(boardArray[0]).childNodes[0].childNodes.forEach(item => {
            item.classList.remove('vacant', 'occupied')
            item.removeEventListener('click', registerClick, true)
        })
        //Adds the hover effects and functions back to all squares
        let classname = document.getElementsByClassName('childchild');
        Object.keys(classname).forEach(element => {
            classname[element].addEventListener('click', registerClick, true);
            classname[element].className += ' vacant';
        });

        boardArray.forEach((item, index) => {
            //Removes blur from sections
            document.querySelector(`#${item}`).childNodes[0].className = 'smallBoard-container'
            //Removes the red X or O over the sections
            document.querySelector(`#${boardArray[index]}`).childNodes[1].style.display = 'none'
            document.querySelector(`#${boardArray[index]}`).childNodes[2].style.display = 'none'
        })
        //Resetting the arrays to start
        for (let count = 0; count < 9; count++) {
            placementArray[count] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        // setBoard()
        excludeArray = [];
        overBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        isPlayer = true
        let strikeThroughArr = ['h-top', 'h-mid', 'h-bot', 'v-left', 'v-mid', 'v-right', 'd-rtl', 'd-ltr']
        strikeThroughArr.forEach(item => {
            if (document.getElementById(item)) { document.getElementById(item).classList.remove('horizontal', 'vertical', 'diagonal-rtl', 'diagonal-ltr') }
        })
    }

    function checkSectionWin() {
        // console.table(placementArray)
        placementArray.forEach((array, index) => {
            //Ignores array that has already been won
            if (excludeArray.includes(index)) {
                return;
            }
            if (checkForWin(array).state) {
                console.log('DING DING DING')
                changeDisplay(index)
                removeEffects(index)
                excludeArray.push(index)
                overBoard[index] = isPlayer ? 2 : 1
                checkOverboardWin()
            } else if (checkForWin(array).state === false && checkForWin(array).winCondition === 'tie') {
                document.querySelector(`#${boardArray[index]}`).childNodes[0].className += ' blur'
                removeEffects(index)
                excludeArray.push(index)
                console.log('Tie')
            }
        })
    }

    function checkOverboardWin() {
        if (checkForWin(overBoard).state) {
            console.log(checkForWin(overBoard))
            console.log("WE HAVE A WINNER!!")
            boardArray.forEach((array, index) => removeEffects(index))
            let location = document.getElementById(checkForWin(overBoard).winCondition)
            switch (checkForWin(overBoard).winCondition.charAt(0)) {
                case 'h': location.className = 'horizontal'
                    break;
                case 'v': location.className = 'vertical'
                    break;
                case 'd': if (checkForWin(overBoard).winCondition === 'd-rtl') {
                    location.className = 'diagonal-rtl'
                } else {
                    location.className = 'diagonal-ltr'
                }
                    break;
                default: break;
            }
        }
    }

    function checkForWin(array) {
        let winCondition;
        let currentPlayer = isPlayer ? 2 : 1
        // Purely so I don't aave to write out all the win conditions...again
        function shortCut(num1, num2, num3) {
            return (array[num1] === currentPlayer &&
                array[num2] === currentPlayer &&
                array[num3] === currentPlayer)
        }
        if (shortCut(0, 1, 2)) {
            winCondition = 'h-top'; return { state: true, winCondition }
        }
        if (shortCut(3, 4, 5)) {
            winCondition = 'h-mid'; return { state: true, winCondition }
        }
        if (shortCut(6, 7, 8)) {
            winCondition = 'h-bot'; return { state: true, winCondition }
        }
        if (shortCut(0, 3, 6)) {
            winCondition = 'v-left';
            console.log('noted')
            return { state: true, winCondition }
        }
        if (shortCut(1, 4, 7)) {
            winCondition = 'v-mid'; return { state: true, winCondition }
        }
        if (shortCut(2, 5, 8)) {
            winCondition = 'v-right'; return { state: true, winCondition }
        }
        if (shortCut(0, 4, 8)) {
            winCondition = 'd-rtl'; return { state: true, winCondition }
        }
        if (shortCut(2, 4, 6)) {
            winCondition = 'd-ltr'; return { state: true, winCondition }
        } if (!array.includes(0)) {
            winCondition = 'tie'; return { state: false, winCondition }
        }
        return { state: false }
    }

    function removeEffects(section) {
        document.getElementById(boardArray[section]).childNodes[0].childNodes.forEach(item => {
            item.classList.remove('vacant', 'occupied')
            item.removeEventListener('click', registerClick, true)
        })
    }
    //Blurs section on win and shows winning symbol
    function changeDisplay(index) {
        let currentPlayer = isPlayer ? 2 : 1
        //Blurs section after it is claimed
        document.querySelector(`#${boardArray[index]}`).childNodes[0].className += ' blur'
        //Displays X or O depending on who wins the section
        document.querySelector(`#${boardArray[index]}`).childNodes[currentPlayer === 2 ? 1 : 2].style.display = 'flex'
    }

    //Animates a line moving throught the winning row/column/etc
    function strikeThrough(array) {
        switch (array) {
            case "A": return <div><div id="h-top"></div><div id="v-left"></div><div id="d-rtl"></div></div>;
            case 'B': return <div id="v-mid"></div>
            case 'C': return <div><div id="v-right"></div><div id="d-ltr"></div></div>
            case 'D': return <div id="h-mid"></div>
            case 'G': return <div><div id="h-bot"></div></div>
            default: break;
        }
    }

    return (
        <div className="bigBoard">
            {boardArray.map((array, index) => (
                <div id={array} className={`${numberArray[index]}Thick child`} key={`${numberArray[index]}Thickzero`}>
                    <div className="smallBoard-container">
                        {numberArray.map((square) => (
                            <div id={square} className={`${square} childchild`} key={square}></div>
                        ))}
                    </div>
                    <div className="win">
                        <p>X</p>
                    </div>
                    <div className="win">
                        <p>O</p>
                    </div>
                    {strikeThrough(array)}
                </div>
            ))}
            <div></div>
            <button className="reset-button" onClick={() => resetBoard()}>Reset Board</button>
        </div>
    )
}