import React, { useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import './Header.css'

export default function Header() {

    const [opponent, setOpponent] = useState('vs. Player 2')
    let state = true
    function showOpponent() {

        if (state) {
            if (state) {
                state = false
            } else {
                state = true
            }
        }
        state ? setOpponent('vs. Player 2') : setOpponent('vs. Comp')
    }

    return <>
        <Container fluid className='pt-4 px-3'>
            <h2 className='title'>Ultimate Tic Tac Toe <span>{opponent}</span></h2>
            <button onClick={() => showOpponent()}>Click</button>
            <Alert variant="success">
                <Alert.Heading>Hey, nice to see you</Alert.Heading>
                <p>
                    Aww yeah, you successfully read this important alert message. This example
                    text is going to run a bit longer so that you can see how spacing within an
                    alert works with this kind of content.
                </p>
                <hr />
                <p className="mb-0">
                    Whenever you need to, be sure to use margin utilities to keep things nice
                    and tidy.
                </p>
            </Alert>
        </Container>
    </>
}