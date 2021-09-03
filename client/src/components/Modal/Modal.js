import React, { useEffect, useRef } from 'react';
import './Modal.css'

export default function Modal({ children, showModal, close }) {

    const modelRef = useRef()

    useEffect(() => {
        function handleClick(event) {
            if (modelRef.current && !modelRef.current.contains(event.target)) {
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
            showModal ?
                <div>
                    <div className='modal-dimScreen'></div>
                    <div className='modal-container title' ref={modelRef}>
                        {children}
                    </div>
                </div>


                : null}
    </>
}