import './App.css';
import { Login } from './components/Login';
import background from './img/video.mp4';
import logo from './img/cinema.png'

export const App = () => {
  return (
    <div className='hero'>
      <video autoPlay loop muted playsInline className='back-video'>
        <source src={background} type='video/mp4' />
      </video>
      <div className='col-lg-5 col-12 slogan'>
      <h1>MovieSwipe</h1>
      <img className='col-3' src={logo}></img>
      <Login />
      </div>
    </div>
  );
}

export default App;
