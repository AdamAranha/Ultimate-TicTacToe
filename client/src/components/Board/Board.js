import React, { useRef } from 'react';
import './Board.css';

export default function Board({ boxContent, parent }) {

    let thisRef = useRef();
    let boardArray = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    let parentArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']

    function target(event) {
        console.log(event.target.parentNode.parentNode.id)
    }
    return (
        <div className='board-container'>
            {boardArray.map(item => (
                <div className={parent ? `board-box board-box-${item} parent` : `board-box board-box-${item} child`} id={parent ? `${parentArray[item]}` : `${parentArray[item]}${item}`} key={`box${item}`} onClick={
                    target} >
                    {boxContent}
                </div>
            ))}
        </div>

    )
}

