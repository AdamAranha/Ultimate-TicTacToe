
const sectionArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
let socket;






const boardUtil = {

    registerClick: function (event) {
        console.log(event.target.id)
        socket.emit('requestPosition', {
            position: event.target.id,
            id: socket.id
        })
        boardUtil.removeEventListeners()
    },


    setBoard: function (board) {
        let gameBoard = [...board]
        gameBoard.forEach((section, sectionIndex) => {
            section.forEach((square, squareIndex) => {
                document.querySelector(`#${sectionArray[sectionIndex]}-${squareIndex}`).innerHTML =
                    square === 0 ? null :
                        square === 1 ? '<span class="markerX">X</span>' : '<span class="markerO">O</span>'
            })
        })
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