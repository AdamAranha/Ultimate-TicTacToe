
const sectionArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
let socket;
let excludeArray = [];





const boardUtil = {

    registerClick: function (event) {
        console.log(event.target.id)
        socket.emit('requestPosition', {
            position: event.target.id,
            id: socket.id
        },
            function onResponse({ wasPlaced }) {
                if (wasPlaced) { boardUtil.removeEventListeners() }
            })

    },


    setBoard: function (boardData) {
        const { newBoardState, overBoardWin, winCondition } = boardData
        // let gameBoard = [...boardData.newBoardState];
        newBoardState.forEach((section, sectionIndex) => {
            section.forEach((square, squareIndex) => {

                switch (square) {
                    case 0:
                        document.querySelector(`#${sectionArray[sectionIndex]}-${squareIndex}`).innerHTML = ''
                        document.querySelector(`#${sectionArray[sectionIndex]}-${squareIndex}`).classList.replace('occupied', 'vacant');
                        break;
                    case 1:
                        document.querySelector(`#${sectionArray[sectionIndex]}-${squareIndex}`).innerHTML = '<span class="markerX">X</span>';
                        document.querySelector(`#${sectionArray[sectionIndex]}-${squareIndex}`).classList.replace('vacant', 'occupied');
                        break;
                    case 2:
                        document.querySelector(`#${sectionArray[sectionIndex]}-${squareIndex}`).innerHTML = '<span class="markerO">O</span>';
                        document.querySelector(`#${sectionArray[sectionIndex]}-${squareIndex}`).classList.replace('vacant', 'occupied');
                        break;
                    default:
                        break;
                }
            })
        })
        boardData.winArray.forEach((section, sectionIndex) => {
            if (excludeArray.includes(sectionIndex)) return;
            if (section !== 0) {
                document.querySelector(`#${sectionArray[sectionIndex]}`).childNodes[0].className += ' blur';
                document.querySelector(`#${sectionArray[sectionIndex]}`).childNodes[section].style.display = 'flex';
                for (let count = 0; count < 9; count++) {
                    document.getElementById(`${sectionArray[sectionIndex]}-${count}`).classList.remove('vacant', 'occupied');
                    document.getElementById(`${sectionArray[sectionIndex]}-${count}`).removeEventListener('click', boardUtil.registerClick, true);
                }

                excludeArray.push(sectionIndex);
            }
        })
        if (overBoardWin) {
            console.log(winCondition)
            let location = document.getElementById(winCondition)
            switch (winCondition[0]) {
                case 'h': location.className = 'horizontal'
                    break;
                case 'v': location.className = 'vertical'
                    break;
                case 'd': if (winCondition === 'd-rtl') {
                    location.className = 'diagonal-rtl'
                } else {
                    location.className = 'diagonal-ltr'
                } break;
                default: break;
            }
            [...document.getElementsByClassName('childchild')].forEach(square => {
                square.classList.remove('vacant', 'occupied');
            });
        }
    },

    strikeThrough: function (array) {
        switch (array) {
            case "A": return <div><div id="h-top"></div><div id="v-left"></div><div id="d-ltr"></div></div>;
            case 'B': return <div id="v-mid"></div>
            case 'C': return <div><div id="v-right"></div><div id="d-rtl"></div></div>
            case 'D': return <div id="h-mid"></div>
            case 'G': return <div><div id="h-bot"></div></div>
            default: break;
        }
    },

    addEventListeners: function (tempSocket) {
        socket = tempSocket;
        [...document.getElementsByClassName('childchild')].forEach(square => {
            if (excludeArray.includes(sectionArray.indexOf(square.id[0]))) return;
            square.addEventListener('click', boardUtil.registerClick, true);
        });
    },

    removeEventListeners: function (tempSocket) {
        socket = tempSocket;
        [...document.getElementsByClassName('childchild')].forEach(square => {
            square.removeEventListener('click', boardUtil.registerClick, true);
        });
    }
}

export default boardUtil