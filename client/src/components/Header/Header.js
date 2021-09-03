import React, { useEffect, useRef, useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import './Header.css'
import { ReactComponent as LogoShort } from './ttt-logo.svg'
import { ReactComponent as LogoLong } from './ttt-logo-long.svg'
import { ReactComponent as HamburgerMenu } from './hamburger-menu.svg'
import Modal from '../Modal/Modal.js'



export default function Header({ socket }) {

    const [opponent, setOpponent] = useState('Program')
    const [firstPlayer, setFirstPlayer] = useState(null)
    const [showModal_1, setShowModal_1] = useState(false)
    const [showModal_2, setShowModal_2] = useState(false)

    useEffect(() => {
        socket.on('starting', () => {
            if (opponent === 'Program') { toggle(1) }
        })
    })


    function toggle(num) {
        switch (num) {
            case 1:
                setShowModal_1(!showModal_1)
                break;
            case 2:
                setShowModal_2(!showModal_2)
                break;
            default:
                break;
        }
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

    function startGame(firstPlayer) {
        setFirstPlayer(firstPlayer);
        if (firstPlayer) {
            console.log(firstPlayer)
            socket.emit('startGame', firstPlayer)
        }
    }



    return <>
        <div className='header-container'>
            <div className='logo'>
                <LogoLong className='header-logo-long' />
                <LogoShort className='header-logo-short' onClick={() => console.log('Clicking on the SVG works')} />
                <h2 id='opponent-text'>{opponent}</h2>
            </div>
            <Modal showModal={showModal_1} close={() => toggle(1)}>
                <div>Who do you want to go first?</div>
                <button className='modal-options-button' onClick={() => { toggle(1); startGame('Player') }}>You</button>
                <button className='modal-options-button' onClick={() => { toggle(1); startGame('Random') }}>Random</button>
                <button className='modal-options-button' onClick={() => { toggle(1); startGame('Computer') }}>Computer</button>
            </Modal>

            <Modal showModal={showModal_2} close={() => toggle(2)}>
                <p>Are you sure about that?</p>
                <button className='reset-button' onClick={() => toggle(2)}> NAH DAWG</button>
                <button className='reset-button' onClick={() => {
                    toggle(2);
                    showOpponent();
                }}> FO SHO</button>
            </Modal>

            <button className='header-changeGamemode' onClick={() => toggle(2)}>Change Gamemode</button>

            <div className='header-mobile-gameOptions'>
                <HamburgerMenu className="header-hamburger-menu" onClick={() => toggle()} />
            </div>

        </div>

    </>
}