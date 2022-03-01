import React from 'react';
import './App.css';
import {Login} from './components/Login';
import {Register} from './components/Register'
import background from './img/video.mp4';
import logo from './img/cinema.png'

export const App = () => {
  return (
    <div className='hero'>
      <video autoPlay loop muted playsInline className='back-video'>
        <source src={background} type='video/mp4'/>
      </video>
      <nav></nav>
      <img src={logo}></img>
      <h1>MovieSwipe</h1>
      <Login />
    </div>
  );
}

export default App;
