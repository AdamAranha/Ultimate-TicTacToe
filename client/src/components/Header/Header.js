import React, { useRef, useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import './Header.css'
import { ReactComponent as LogoShort } from './ttt-logo.svg'
import { ReactComponent as LogoLong } from './ttt-logo-long.svg'
import { ReactComponent as HamburgerMenu } from './hamburger-menu.svg'
import Modal from '../Modal/Modal.js'



export default function Header({ socket }) {

    const [opponent, setOpponent] = useState('Program')
    const [showModal, setShowModal] = useState(false)
    const avoidRef1 = useRef();
    const avoidRef2 = useRef();


    function toggle() {
        setShowModal(!showModal)
    }

    function showOpponent() {

        if (opponent === 'User') {
            setOpponent('Program')
            document.getElementById('opponent-text').style.color = '#FF7920'
        } else {
            setOpponent('User')
            document.getElementById('opponent-text').style.color = '#104be0'
        }
    }

    return <>
        <div className='header-container'>
            <div className='logo'>
                <LogoLong className='header-logo-long' />
                <LogoShort className='header-logo-short' onClick={() => console.log('Clicking on the SVG works')} />
                <h2 id='opponent-text'>{opponent}</h2>
            </div>
            <Modal socket={socket} show={showModal} close={toggle} showOpponent={showOpponent} avoid1={avoidRef1} avoid2={avoidRef2} className='app-modal' message='You are about to start a new game, current game progress will be lost.' />

            <div className='whatever'>
                <button ref={avoidRef1} className='header-changeGamemode' onClick={() => toggle()}>Change Gamemode</button>
                <HamburgerMenu ref={avoidRef2} className="header-hamburger-menu" onClick={() => toggle()} />
            </div>

        </div>

    </>
}