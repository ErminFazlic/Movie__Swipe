import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Home} from './components/Home';
import Register from './components/Register';
import Friends from './components/Friends';
import Navigation from './components/Navigation'
import Profile from './components/Profile';
import Likes from './components/Likes';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/login" element={<App />} ></Route>
        <Route path="/home" element={<Home />} ></Route>
        <Route path="/register" element={<Register />} ></Route>
        <Route path="/friends" element={<><Navigation /><Friends /></>} ></Route>
        <Route path="/profile" element={<><Navigation /><Profile /></>} ></Route>
        <Route path="/likes" element={<><Navigation /><Likes /></>} ></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
