import React from 'react';
import './Board.css'

function Board() {

    // placementArray keeps track of x's and o's on the board
    let placementArray = [];
    for (let count = 0; count < 9; count++) {
        placementArray[count] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    let boardArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
    let isPlayer = true
    let excludeArray = [];


    function registerClick(event) {
        let numberArray = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight']

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
                // console.log(`${boardArray[arrayIndex]},${squareIndex}`)
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
                // console.log(index)
                excludeArray.push(index)
                console.log(excludeArray)


            } else {
            }
        })
        return isWin
        // Horizontal Win Conditions



    }



    return (
        <div className="bigBoard">
            <div id="A" className="one child">
                <div className="smallBoard-container">
                    <div id={`zero`} className=" one childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="one" className="two childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="two" className="three childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="three" className="four childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="four" className="five childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="five" className="six childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="six" className="seven childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="seven" className="eight childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="eight" className="nine childchild" onClick={(event) => registerClick(event)}></div>
                </div>
            </div>
            <div id="B" className="two child">
                <div className="smallBoard-container">
                    <div id={`zero`} className=" one childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="one" className="two childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="two" className="three childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="three" className="four childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="four" className="five childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="five" className="six childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="six" className="seven childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="seven" className="eight childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="eight" className="Anine nine childchild" onClick={(event) => registerClick(event)}></div>
                </div>
            </div>
            <div id="C" className="three child">
                <div className="smallBoard-container">
                    <div id={`zero`} className=" one childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="one" className="two childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="two" className="three childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="three" className="four childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="four" className="five childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="five" className="six childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="six" className="seven childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="seven" className="eight childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="eight" className="nine childchild" onClick={(event) => registerClick(event)}></div>
                </div>
            </div>
            <div id="D" className="four child">
                <div className="smallBoard-container">
                    <div id={`zero`} className=" one childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="one" className="two childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="two" className="three childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="three" className="four childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="four" className="five childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="five" className="six childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="six" className="seven childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="seven" className="eight childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="eight" className="nine childchild" onClick={(event) => registerClick(event)}></div>
                </div>
            </div>
            <div id="E" className="five child">
                <div className="smallBoard-container">
                    <div id={`zero`} className=" one childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="one" className="two childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="two" className="three childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="three" className="four childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="four" className="five childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="five" className="six childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="six" className="seven childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="seven" className="eight childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="eight" className="nine childchild" onClick={(event) => registerClick(event)}></div>
                </div>
            </div>
            <div id="F" className="six child">
                <div className="smallBoard-container">
                    <div id={`zero`} className=" one childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="one" className="two childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="two" className="three childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="three" className="four childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="four" className="five childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="five" className="six childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="six" className="seven childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="seven" className="eight childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="eight" className="nine childchild" onClick={(event) => registerClick(event)}></div>
                </div>
            </div>
            <div id="G" className="seven child">
                <div className="smallBoard-container">
                    <div id={`zero`} className=" one childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="one" className="two childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="two" className="three childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="three" className="four childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="four" className="five childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="five" className="six childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="six" className="seven childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="seven" className="eight childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="eight" className="nine childchild" onClick={(event) => registerClick(event)}></div>
                </div>
            </div>
            <div id="H" className="eight child">
                <div className="smallBoard-container">
                    <div id={`zero`} className=" one childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="one" className="two childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="two" className="three childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="three" className="four childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="four" className="five childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="five" className="six childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="six" className="seven childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="seven" className="eight childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="eight" className="nine childchild" onClick={(event) => registerClick(event)}></div>
                </div>
            </div>
            <div id="I" className="nine child">
                <div className="smallBoard-container">
                    <div id={`zero`} className=" one childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="one" className="two childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="two" className="three childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="three" className="four childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="four" className="five childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="five" className="six childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="six" className="seven childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="seven" className="eight childchild" onClick={(event) => registerClick(event)}></div>
                    <div id="eight" className="nine childchild" onClick={(event) => registerClick(event)}></div>
                </div>
            </div>

        </div>
    )
}

export default Board