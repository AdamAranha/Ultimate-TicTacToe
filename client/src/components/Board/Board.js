import React, { useEffect, useRef, useState } from 'react';
import './Board.css';

export default function Board({ boxContent, parent }) {

    const [childId, setChildId] = useState('')
    let thisRef = useRef();
    let boardArray = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    let parentArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']


    useEffect(() => {
        if (!parent) {
            setChildId(thisRef.current.parentNode.parentNode.id)
        }
    }, [])

    function target(event) {
        console.log(event.target.id)
    }
    return (
        <div className='board-container'>
            {boardArray.map(item => (
                <div className={parent ? `board-box board-box-${item} parent` : `board-box board-box-${item} child`} id={parent ? `${parentArray[item]}` : `${childId}${item}`} key={`box${item}`}
                    onClick={parent ? null : (event) => target(event)} ref={parent ? null : thisRef} >
                    {boxContent}
                </div>
            ))}
        </div>

    )
}

