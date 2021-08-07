import React, { useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import './Header.css'
import { ReactComponent as YourSvg } from './ttt-logo.svg'
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
                {/* <LogoLong /> */}
                <YourSvg onClick={() => console.log('Clicking on the SVG works')} />
                <h2 id='opponent-text'>{opponent}</h2>
            </div>
            <div className='whatever'>
                {/* <button onClick={() => showOpponent()}>Change Gamemode</button> */}
                <HamburgerMenu id="hamburger-menu" onClick={() => showOpponent()} />
            </div>
        </div>

    </>
}