import React from 'react';
import './Board.css'

function Board() {

    let numberArray = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight']
    // placementArray keeps track of x's and o's on the board
    let placementArray = [];
    for (let count = 0; count < 9; count++) {
        placementArray[count] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    let boardArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
    let isPlayer = true

    function registerClick(event) {
        // console.log(event.target.parentNode.parentNode.id)
        // console.log(event.target.id)

        placementArray[boardArray.indexOf(event.target.parentNode.parentNode.id)][numberArray.indexOf(event.target.id)] = isPlayer ? 2 : 1
        // placementArray[wordToNumber(event.target.id)] = isPlayer ? 2 : 1
        console.table(placementArray)

        setBoard(event)
        isPlayer = !isPlayer
    }

    function setBoard(event) {
        let counter = 1
        // console.log(event.target.id)

        // console.log(document.querySelector(`#${event.target.parentNode.parentNode.id}`).childNodes[0].childNodes[0])


        placementArray.forEach((array, arrayIndex) => {
            array.forEach((square, squareIndex) => {
                console.log(`${boardArray[arrayIndex]},${squareIndex}`)
                // console.log(event.target.parentNode.parentNode)
                document.querySelector(`#${boardArray[arrayIndex]}`).childNodes[0].childNodes[squareIndex].innerHTML =
                    square === 0 ? '' : square === 1 ? '<span class="markerO">O</span>' : '<span class="markerX">X</span>'
            })
        })


        // placementArray.forEach((item, index) => {
        //     document.querySelector(`#${numberToWord(index)}`).innerHTML =
        //         item === 0 ? '' : item === 1 ? '<span class="markerO">O</span>' : '<span class="markerX">X</span>'
        // })
        // console.log(checkForWin())
    }

    function getCurrentID(event) {
        // console.log(document.querySelector('.Anine').parentNode.parentNode.id)
        // console.log(event.target.childNodes[0])
        console.log(event.target.parentNode.parentNode)
    }



    function checkForWin() {
        let currentPlayer = isPlayer ? 2 : 1
        // Horizontal Win Conditions
        if ((placementArray[0] === currentPlayer &&
            placementArray[1] === currentPlayer &&
            placementArray[2] === currentPlayer) ||

            (placementArray[3] === currentPlayer &&
                placementArray[4] === currentPlayer &&
                placementArray[5] === currentPlayer) ||

            (placementArray[6] === currentPlayer &&
                placementArray[7] === currentPlayer &&
                placementArray[8] === currentPlayer) ||
            // Vertical Win Conditions
            (placementArray[0] === currentPlayer &&
                placementArray[3] === currentPlayer &&
                placementArray[6] === currentPlayer) ||

            (placementArray[1] === currentPlayer &&
                placementArray[4] === currentPlayer &&
                placementArray[7] === currentPlayer) ||

            (placementArray[2] === currentPlayer &&
                placementArray[5] === currentPlayer &&
                placementArray[8] === currentPlayer) ||
            // Diagonal Win Conditions
            (placementArray[0] === currentPlayer &&
                placementArray[4] === currentPlayer &&
                placementArray[8] === currentPlayer) ||

            (placementArray[2] === currentPlayer &&
                placementArray[4] === currentPlayer &&
                placementArray[6] === currentPlayer)) {

            return true;
        };
        return false;
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