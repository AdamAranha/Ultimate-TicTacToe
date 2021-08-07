// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header.js';
import Board from './components/Board/Board.js'

// import io from 'socket.io-client';
import { useState, useEffect } from 'react';

// const socket = io('http://localhost:5000')

function App() {

  const [opponent, setOpponent] = useState('program')

  useEffect(() => {
    console.log(`The viewport dimensions are ${window.innerWidth}x${window.innerHeight}`)
  }, [])


  return (
    <div>
      <Header />
      <div className='body-wrapper'>
        <Board opponent={opponent} />
      </div>
    </div>
  );
}

export default App;
