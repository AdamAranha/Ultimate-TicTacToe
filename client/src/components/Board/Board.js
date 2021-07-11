import React from 'react';
import './Board.css';

export default function Board({ boxContent }) {

    let board = [0, 1, 2, 3, 4, 5, 6, 7, 8]


    return (
        <div className='board-container'>
            {board.map(item => (
                <div className={`board-box board-box-${item}`}>
                    {boxContent}
                </div>
            ))}
        </div>

    )
}

