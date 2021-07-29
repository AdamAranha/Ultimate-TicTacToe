// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header.js';
import Board from './components/Board/Board.js'

import io from 'socket.io-client';
import { useEffect } from 'react';


let socket

function App() {

  const ENDPOINT = 'http://localhost:5000'
  useEffect(() => {

    socket = io(ENDPOINT)
    // console.log(socket)
    console.log(`The viewport dimensions are ${window.innerWidth}x${window.innerHeight}`)
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
