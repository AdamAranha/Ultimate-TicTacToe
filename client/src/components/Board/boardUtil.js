const boardUtil = {
    registerClick: function (event, socket) {
        console.log(event.target.id)
        socket.emit('surpriseBitch', event.target.id)
    }
    ,
    strikeThrough: function (array) {
        switch (array) {
            case "A": return <div><div id="h-top"></div><div id="v-left"></div><div id="d-ltr"></div></div>;
            case 'B': return <div id="v-mid"></div>
            case 'C': return <div><div id="v-right"></div><div id="d-rtl"></div></div>
            case 'D': return <div id="h-mid"></div>
            case 'G': return <div><div id="h-bot"></div></div>
            default: break;
        }
    }
}

export default boardUtil