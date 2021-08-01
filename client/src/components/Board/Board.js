import React, { useEffect } from 'react';
import './Board.css'

export default function Board() {

    useEffect(() => {
        let classname = document.getElementsByClassName('childchild');
        Object.keys(classname).forEach(element => {
            classname[element].addEventListener('click', registerClick, true);
            classname[element].className += ' vacant';
        });
    })
    // placementArray keeps track of x's and o's on the board
    let placementArray = [];
    for (let count = 0; count < 9; count++) {
        placementArray[count] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    let overBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    let boardArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
    let numberArray = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight']

    let isPlayer = true
    let excludeArray = [];


    function registerClick(event) {
        console.log(temp())
        if (placementArray[boardArray.indexOf(event.target.parentNode.parentNode.id)][numberArray.indexOf(event.target.id)] === 0) {
            placementArray[boardArray.indexOf(event.target.parentNode.parentNode.id)][numberArray.indexOf(event.target.id)] = isPlayer ? 2 : 1
            setBoard()
            //Changes hover colour of squares from green to red when they become occupied
            let classList = document.getElementById(event.target.parentNode.parentNode.id).childNodes[0].childNodes[numberArray.indexOf(event.target.id)].className
            document.getElementById(event.target.parentNode.parentNode.id).childNodes[0].childNodes[numberArray.indexOf(event.target.id)].className = classList.replace('vacant', 'occupied')
            isPlayer = !isPlayer
        } else {
            console.log("Space occupied")
        }

        function temp() {
            return ('It works')
        }
    }

    function setBoard() {
        placementArray.forEach((array, arrayIndex) => {
            array.forEach((square, squareIndex) => {
                document.querySelector(`#${boardArray[arrayIndex]}`).childNodes[0].childNodes[squareIndex].innerHTML =
                    square === 0 ? '' : square === 1 ? '<span class="marker">O</span>' : '<span class="marker">X</span>'
            })
        })
        checkSectionWin();
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
        setBoard()
        excludeArray = [];
        overBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        isPlayer = true
    }

    function checkSectionWin() {
        placementArray.forEach((array, index) => {
            //Ignores array that has already been won
            if (excludeArray.includes(index)) {
                return;
            }
            if (checkForWin(array)) {
                console.log('DING DING DING')
                changeDisplay(index)
                removeEffects(index)
                excludeArray.push(index)
                overBoard[index] = isPlayer ? 2 : 1
                checkOverboardWin()
                console.log(overBoard)
            }
        })
    }

    function checkOverboardWin() {
        if (checkForWin(overBoard)) {
            console.log("WE HAVE A WINNER!!")
            boardArray.forEach((array, index) => removeEffects(index))
        }
    }

    function checkForWin(array) {
        let currentPlayer = isPlayer ? 2 : 1
        // Purely so I don't aave to write out all the win conditions...again
        function shortCut(num1, num2, num3) {
            return (array[num1] === currentPlayer &&
                array[num2] === currentPlayer &&
                array[num3] === currentPlayer)
        }
        //Horizontal Win Conditions
        if ((shortCut(0, 1, 2)) || (shortCut(3, 4, 5)) || (shortCut(6, 7, 8))
            ||
            //Vertical Win Conditions
            (shortCut(0, 3, 6)) || (shortCut(1, 4, 7)) || (shortCut(2, 5, 8))
            ||
            //Vertical Win Conditions
            (shortCut(0, 4, 8)) || (shortCut(2, 4, 6))) {
            return true
        } else {
            return false
        }
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

    return (
        <div className="bigBoard">
            {boardArray.map((array, index) => (
                <div id={array} className={`${numberArray[index]}Thick child`} key={`${numberArray[index]}Thick child`}>
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
                </div>
            ))}
            <div></div>
            <button onClick={() => resetBoard()}>Reset</button>
        </div>
    )
}