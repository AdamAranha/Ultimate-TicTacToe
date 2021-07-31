import React, { useEffect } from 'react';
import './Board.css'

function Board() {

    useEffect(() => {
        let classname = document.getElementsByClassName('childchild');
        Object.keys(classname).forEach(element => {
            classname[element].addEventListener('click', register, true)
            // console.log(key);        // the name of the current key.
            // console.log(classname[key]); // the value of the current key.
        });
    })
    // placementArray keeps track of x's and o's on the board
    let placementArray = [];
    for (let count = 0; count < 9; count++) {
        placementArray[count] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    let boardArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
    let isPlayer = true
    let excludeArray = [];


    let register = function registerClick(event) {
        let numberArray = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight']
        console.log(event)
        if (placementArray[boardArray.indexOf(event.target.parentNode.parentNode.id)][numberArray.indexOf(event.target.id)] === 0) {
            placementArray[boardArray.indexOf(event.target.parentNode.parentNode.id)][numberArray.indexOf(event.target.id)] = isPlayer ? 2 : 1
            // console.table(placementArray)
            setBoard()
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
        checkForWin();
    }

    function checkForWin() {
        let currentPlayer = isPlayer ? 2 : 1
        let isWin;

        placementArray.forEach((array, index) => {
            //Ignores array that has already been won
            if (excludeArray.includes(index)) {
                return;
            }
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

                isWin = console.log('DING DING DING')
                //Blurs sector on win
                document.querySelector(`#${boardArray[index]}`).className += ' blur'
                // console.log(document.querySelector(`#${boardArray[index]}`).childNodes[0].childNodes)
                console.log(index)
                // Remove onClick from all squares in sector on win
                removeHandlers(index)
                excludeArray.push(index)
                console.log(excludeArray)


            } else {
            }
        })
        return isWin
    }

    function removeHandlers(sector) {

        console.log(boardArray[sector])
        document.getElementById(boardArray[sector]).childNodes[0].childNodes.forEach(item => {
            item.removeEventListener('click', register, true)
        })
    }


    return (
        <div className="bigBoard">
            <div id="A" className="one child">
                <div className="smallBoard-container">
                    <div id={`zero`} className=" one childchild"></div>
                    <div id="one" className="two childchild"></div>
                    <div id="two" className="three childchild"></div>
                    <div id="three" className="four childchild"></div>
                    <div id="four" className="five childchild"></div>
                    <div id="five" className="six childchild"></div>
                    <div id="six" className="seven childchild"></div>
                    <div id="seven" className="eight childchild"></div>
                    <div id="eight" className="nine childchild"></div>
                </div>
            </div>
            <div id="B" className="two child">
                <div className="smallBoard-container">
                    <div id={`zero`} className=" one childchild"></div>
                    <div id="one" className="two childchild"></div>
                    <div id="two" className="three childchild"></div>
                    <div id="three" className="four childchild"></div>
                    <div id="four" className="five childchild"></div>
                    <div id="five" className="six childchild"></div>
                    <div id="six" className="seven childchild"></div>
                    <div id="seven" className="eight childchild"></div>
                    <div id="eight" className="nine childchild"></div>
                </div>
            </div>
            <div id="C" className="three child">
                <div className="smallBoard-container">
                    <div id={`zero`} className=" one childchild"></div>
                    <div id="one" className="two childchild"></div>
                    <div id="two" className="three childchild"></div>
                    <div id="three" className="four childchild"></div>
                    <div id="four" className="five childchild"></div>
                    <div id="five" className="six childchild"></div>
                    <div id="six" className="seven childchild"></div>
                    <div id="seven" className="eight childchild"></div>
                    <div id="eight" className="nine childchild"></div>
                </div>
            </div>
            <div id="D" className="four child">
                <div className="smallBoard-container">
                    <div id={`zero`} className=" one childchild"></div>
                    <div id="one" className="two childchild"></div>
                    <div id="two" className="three childchild"></div>
                    <div id="three" className="four childchild"></div>
                    <div id="four" className="five childchild"></div>
                    <div id="five" className="six childchild"></div>
                    <div id="six" className="seven childchild"></div>
                    <div id="seven" className="eight childchild"></div>
                    <div id="eight" className="nine childchild"></div>
                </div>
            </div>
            <div id="E" className="five child">
                <div className="smallBoard-container">
                    <div id={`zero`} className=" one childchild"></div>
                    <div id="one" className="two childchild"></div>
                    <div id="two" className="three childchild"></div>
                    <div id="three" className="four childchild"></div>
                    <div id="four" className="five childchild"></div>
                    <div id="five" className="six childchild"></div>
                    <div id="six" className="seven childchild"></div>
                    <div id="seven" className="eight childchild"></div>
                    <div id="eight" className="nine childchild"></div>
                </div>
            </div>
            <div id="F" className="six child">
                <div className="smallBoard-container">
                    <div id={`zero`} className=" one childchild"></div>
                    <div id="one" className="two childchild"></div>
                    <div id="two" className="three childchild"></div>
                    <div id="three" className="four childchild"></div>
                    <div id="four" className="five childchild"></div>
                    <div id="five" className="six childchild"></div>
                    <div id="six" className="seven childchild"></div>
                    <div id="seven" className="eight childchild"></div>
                    <div id="eight" className="nine childchild"></div>
                </div>
            </div>
            <div id="G" className="seven child">
                <div className="smallBoard-container">
                    <div id={`zero`} className=" one childchild"></div>
                    <div id="one" className="two childchild"></div>
                    <div id="two" className="three childchild"></div>
                    <div id="three" className="four childchild"></div>
                    <div id="four" className="five childchild"></div>
                    <div id="five" className="six childchild"></div>
                    <div id="six" className="seven childchild"></div>
                    <div id="seven" className="eight childchild"></div>
                    <div id="eight" className="nine childchild"></div>
                </div>
            </div>
            <div id="H" className="eight child">
                <div className="smallBoard-container">
                    <div id={`zero`} className=" one childchild"></div>
                    <div id="one" className="two childchild"></div>
                    <div id="two" className="three childchild"></div>
                    <div id="three" className="four childchild"></div>
                    <div id="four" className="five childchild"></div>
                    <div id="five" className="six childchild"></div>
                    <div id="six" className="seven childchild"></div>
                    <div id="seven" className="eight childchild"></div>
                    <div id="eight" className="nine childchild"></div>
                </div>
            </div>
            <div id="I" className="nine child">
                <div className="smallBoard-container">
                    <div id={`zero`} className=" one childchild"></div>
                    <div id="one" className="two childchild"></div>
                    <div id="two" className="three childchild"></div>
                    <div id="three" className="four childchild"></div>
                    <div id="four" className="five childchild"></div>
                    <div id="five" className="six childchild"></div>
                    <div id="six" className="seven childchild"></div>
                    <div id="seven" className="eight childchild"></div>
                    <div id="eight" className="nine childchild"></div>
                </div>
            </div>

        </div>
    )
}

export default Board