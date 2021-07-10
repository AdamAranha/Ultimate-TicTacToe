// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';

import io from 'socket.io-client';
import { useEffect } from 'react';


let socket

function App() {

  const ENDPOINT = 'http://localhost:5000'
  useEffect(() => {

    socket = io(ENDPOINT)
    // console.log(socket)
  }, [])


  return (
    <div>
      <Header />
    </div>
  );
}

export default App;
