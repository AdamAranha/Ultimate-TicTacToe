import React, { useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import './Header.css'
import { ReactComponent as LogoShort } from './ttt-logo.svg'
import { ReactComponent as LogoLong } from './ttt-logo-long.svg'
import { ReactComponent as HamburgerMenu } from './hamburger-menu.svg'



export default function Header() {

    const [opponent, setOpponent] = useState('Program')

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
            <div className='whatever'>
                <button className='header-changeGamemode' onClick={() => showOpponent()}>Change Gamemode</button>
                <HamburgerMenu className="header-hamburger-menu" onClick={() => showOpponent()} />
            </div>
        </div>

    </>
}