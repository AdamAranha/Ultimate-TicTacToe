import React, { useEffect, useRef, useState } from 'react';
import './Board.css';

export default function Board({ boxContent, parent }) {

    const [childId, setChildId] = useState('')
    const [position, setPosition] = useState([

    ])

    let thisRef = useRef();
    const boardArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const parentArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    let input = <div className='board-input'>Hi</div>;
    let output = "<div className='board-output'>Bye</div>";


    useEffect(() => {
        if (!parent) {
            setChildId(thisRef.current.parentNode.parentNode.id)
        }

    }, [])

    function target(event) {
        console.log(event.target.id)
        event.target.innerHTML = output
    }

    return (
        <div className='board-container'>
            {boardArray.map(item => (
                <div className={parent ? `board-box board-box-${item} parent` : `board-box board-box-${item} child`} id={parent ? `${parentArray[item]}` : `${childId}${item}`} key={`box${item}`}
                    onClick={parent ? null : (event) => target(event)} ref={parent ? null : thisRef} >
                    {parent ? boxContent : position}
                </div>
            ))}
        </div>

    )
}

