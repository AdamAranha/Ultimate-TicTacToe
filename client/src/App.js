// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header.js';
import Board from './components/Board/Board.js'

// import io from 'socket.io-client';
import { useState, useEffect } from 'react';

// const socket = io('http://localhost:5000')

function App() {

  const [gamemode, setGamemode] = useState('AI')
  const [currentPlayer, setCurrentPlayer] = useState('Player1')

  // const ENDPOINT = 'http://localhost:5000'


  useEffect(() => {
    // socket.on('init', (msg) => {
    //   console.log('The server says', '[' + msg.data + ']')
    // })
    // console.log(socket)
    console.log(`The viewport dimensions are ${window.innerWidth}x${window.innerHeight}`)
    console.log(currentPlayer)
  }, [])


  return (
    <div>
      <Header />
      <div className='body-wrapper'>
        <Board />
      </div>
    </div>
  );
}

export default App;
