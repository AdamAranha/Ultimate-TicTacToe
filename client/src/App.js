// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header.js';
import Board from './components/Board/Board.js'
import { useState, useEffect } from 'react';


function App() {

  const [opponent, setOpponent] = useState('program')
  const [showModal, setShowModal] = useState(false)

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
