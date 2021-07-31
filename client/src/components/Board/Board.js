import React, { useEffect } from 'react';
import './Board.css'

function Board() {

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
    let isPlayer = true
    let excludeArray = [];


    function registerClick(event) {
        let numberArray = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight']
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

    function checkSectionWin() {
        placementArray.forEach((array, index) => {
            //Ignores array that has already been won
            if (excludeArray.includes(index)) {
                return;
            }
            if (checkForWin(array)) {
                console.log('DING DING DING')
                changeDisplay(index)
                removeHandlers(index)
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
            boardArray.forEach((array, index) => removeHandlers(index))

            let classname = document.getElementsByClassName('childchild');
            Object.keys(classname).forEach(element => {
                classname[element].classList.remove('vacant')
                classname[element].classList.remove('occupied')

            });
        }

    }

    function checkForWin(array) {
        let currentPlayer = isPlayer ? 2 : 1

        //Horizontal Win Conditions
        if ((array[0] === currentPlayer &&
            array[1] === currentPlayer &&
            array[2] === currentPlayer)
            ||
            (array[3] === currentPlayer &&
                array[4] === currentPlayer &&
                array[5] === currentPlayer)
            ||
            (array[6] === currentPlayer &&
                array[7] === currentPlayer &&
                array[8] === currentPlayer)
            ||
            //Vertical Win Conditions
            (array[0] === currentPlayer &&
                array[3] === currentPlayer &&
                array[6] === currentPlayer)
            ||
            (array[1] === currentPlayer &&
                array[4] === currentPlayer &&
                array[7] === currentPlayer)
            ||
            (array[2] === currentPlayer &&
                array[5] === currentPlayer &&
                array[8] === currentPlayer)
            ||
            //Vertical Win Conditions
            (array[0] === currentPlayer &&
                array[4] === currentPlayer &&
                array[8] === currentPlayer)
            ||
            (array[2] === currentPlayer &&
                array[4] === currentPlayer &&
                array[6] === currentPlayer)) {
            return true
        } else {
            return false
        }

    }

    function removeHandlers(section) {
        document.getElementById(boardArray[section]).childNodes[0].childNodes.forEach(item => {

            item.removeEventListener('click', registerClick, true)
        })
    }
    //Blurs sector on win and shows winning symbol
    function changeDisplay(index) {
        let currentPlayer = isPlayer ? 2 : 1

        document.querySelector(`#${boardArray[index]}`).childNodes[0].className += ' blur'
        // document.querySelector('.win-X').style.display = 'flex'
        document.querySelector(`#${boardArray[index]}`).childNodes[currentPlayer === 2 ? 1 : 2].style.display = 'flex'
    }

    return (
        <div className="bigBoard">
            <div id="A" className="one child">
                <div className="smallBoard-container">
                    <div id={`zero`} className="one childchild"></div>
                    <div id="one" className="two childchild"></div>
                    <div id="two" className="three childchild"></div>
                    <div id="three" className="four childchild"></div>
                    <div id="four" className="five childchild"></div>
                    <div id="five" className="six childchild"></div>
                    <div id="six" className="seven childchild"></div>
                    <div id="seven" className="eight childchild"></div>
                    <div id="eight" className="nine childchild"></div>
                </div>
                <div className="win">
                    X
                </div>
                <div className="win">
                    O
                </div>
            </div>
            <div id="B" className="two child">
                <div className="smallBoard-container">
                    <div id={`zero`} className="one childchild"></div>
                    <div id="one" className="two childchild"></div>
                    <div id="two" className="three childchild"></div>
                    <div id="three" className="four childchild"></div>
                    <div id="four" className="five childchild"></div>
                    <div id="five" className="six childchild"></div>
                    <div id="six" className="seven childchild"></div>
                    <div id="seven" className="eight childchild"></div>
                    <div id="eight" className="nine childchild"></div>
                </div>
                <div className="win">
                    X
                </div>
                <div className="win">
                    O
                </div>
            </div>
            <div id="C" className="three child">
                <div className="smallBoard-container">
                    <div id={`zero`} className="one childchild"></div>
                    <div id="one" className="two childchild"></div>
                    <div id="two" className="three childchild"></div>
                    <div id="three" className="four childchild"></div>
                    <div id="four" className="five childchild"></div>
                    <div id="five" className="six childchild"></div>
                    <div id="six" className="seven childchild"></div>
                    <div id="seven" className="eight childchild"></div>
                    <div id="eight" className="nine childchild"></div>
                </div>
                <div className="win">
                    X
                </div>
                <div className="win">
                    O
                </div>
            </div>
            <div id="D" className="four child">
                <div className="smallBoard-container">
                    <div id={`zero`} className="one childchild"></div>
                    <div id="one" className="two childchild"></div>
                    <div id="two" className="three childchild"></div>
                    <div id="three" className="four childchild"></div>
                    <div id="four" className="five childchild"></div>
                    <div id="five" className="six childchild"></div>
                    <div id="six" className="seven childchild"></div>
                    <div id="seven" className="eight childchild"></div>
                    <div id="eight" className="nine childchild"></div>
                </div>
                <div className="win">
                    X
                </div>
                <div className="win">
                    O
                </div>
            </div>
            <div id="E" className="five child">
                <div className="smallBoard-container">
                    <div id={`zero`} className="one childchild"></div>
                    <div id="one" className="two childchild"></div>
                    <div id="two" className="three childchild"></div>
                    <div id="three" className="four childchild"></div>
                    <div id="four" className="five childchild"></div>
                    <div id="five" className="six childchild"></div>
                    <div id="six" className="seven childchild"></div>
                    <div id="seven" className="eight childchild"></div>
                    <div id="eight" className="nine childchild"></div>
                </div>
                <div className="win">
                    X
                </div>
                <div className="win">
                    O
                </div>
            </div>
            <div id="F" className="six child">
                <div className="smallBoard-container">
                    <div id={`zero`} className="one childchild"></div>
                    <div id="one" className="two childchild"></div>
                    <div id="two" className="three childchild"></div>
                    <div id="three" className="four childchild"></div>
                    <div id="four" className="five childchild"></div>
                    <div id="five" className="six childchild"></div>
                    <div id="six" className="seven childchild"></div>
                    <div id="seven" className="eight childchild"></div>
                    <div id="eight" className="nine childchild"></div>
                </div>
                <div className="win">
                    X
                </div>
                <div className="win">
                    O
                </div>
            </div>
            <div id="G" className="seven child">
                <div className="smallBoard-container">
                    <div id={`zero`} className="one childchild"></div>
                    <div id="one" className="two childchild"></div>
                    <div id="two" className="three childchild"></div>
                    <div id="three" className="four childchild"></div>
                    <div id="four" className="five childchild"></div>
                    <div id="five" className="six childchild"></div>
                    <div id="six" className="seven childchild"></div>
                    <div id="seven" className="eight childchild"></div>
                    <div id="eight" className="nine childchild"></div>
                </div>
                <div className="win">
                    X
                </div>
                <div className="win">
                    O
                </div>
            </div>
            <div id="H" className="eight child">
                <div className="smallBoard-container">
                    <div id={`zero`} className="one childchild"></div>
                    <div id="one" className="two childchild"></div>
                    <div id="two" className="three childchild"></div>
                    <div id="three" className="four childchild"></div>
                    <div id="four" className="five childchild"></div>
                    <div id="five" className="six childchild"></div>
                    <div id="six" className="seven childchild"></div>
                    <div id="seven" className="eight childchild"></div>
                    <div id="eight" className="nine childchild"></div>
                </div>
                <div className="win">
                    X
                </div>
                <div className="win">
                    O
                </div>
            </div>
            <div id="I" className="nine child">
                <div className="smallBoard-container">
                    <div id={`zero`} className="one childchild"></div>
                    <div id="one" className="two childchild"></div>
                    <div id="two" className="three childchild"></div>
                    <div id="three" className="four childchild"></div>
                    <div id="four" className="five childchild"></div>
                    <div id="five" className="six childchild"></div>
                    <div id="six" className="seven childchild"></div>
                    <div id="seven" className="eight childchild"></div>
                    <div id="eight" className="nine childchild"></div>
                </div>
                <div className="win">
                    X
                </div>
                <div className="win">
                    O
                </div>
            </div>

        </div>
    )
}

export default Board