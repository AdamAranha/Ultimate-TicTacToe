import React, { useEffect, useRef } from 'react';
import './Modal.css'

export default function Modal({ message, show, close, showOpponent, avoid1, avoid2, socket }) {

    const modelRef = useRef()

    useEffect(() => {
        function handleClick(event) {
            if (modelRef.current && !modelRef.current.contains(event.target) && !avoid1.current.contains(event.target) && !avoid2.current.contains(event.target)) {
                close()
            }
        }
        // add when mounted
        document.addEventListener("mousedown", handleClick);
        // return function to be called when unmounted
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    })



    return <>
        {
            show ?
                <div>
                    <div className='modal-dimScreen'></div>
                    <div className='modal-container' ref={modelRef}>
                        <p className='modal-text'>{message}</p>
                        <div className='modal-buttonGroup'>
                            <button className='button' onClick={() => {
                                socket.emit('redo')
                                close()
                                showOpponent()
                            }}>Ok</button>
                            <button className='button' onClick={() => close()}>Cancel</button>
                        </div>

                    </div>
                </div>

                : null}
    </>
}