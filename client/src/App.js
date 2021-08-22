// import logo from './logo.svg';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header.js';
import Board from './components/Board/Board.js'
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:5000')

function App() {

  const [opponent, setOpponent] = useState('program')

  useEffect(() => {
    console.log(`The viewport dimensions are ${window.innerWidth}x${window.innerHeight}`)
  }, [])

  return (
    <div>
      <Header socket={socket} />
      <div className='body-wrapper'>
        <Board socket={socket} opponent={opponent} />
      </div>
    </div>
  );
}

export default App;
