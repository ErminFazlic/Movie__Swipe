import React, { useState } from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import {registerUser} from "./../api"
import './Login.css'
import { useNavigate } from "react-router-dom";
import background from '../img/video.mp4';
import logo from '../img/cinema.png'


export const Register = ()=> {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event:any) {
    event.preventDefault();
    const response = registerUser(username, email, password)
    response.then(res=>{
        if(res.status==="500"){
            alert("Please try again")
        }
        else{
            alert("Created account")
            navigate("/login", {replace :true})
        }
    })
  }

  return (
    <div className='hero'>
      <video autoPlay loop muted playsInline className='back-video'>
        <source src={background} type='video/mp4' />
      </video>
      <div className='col-lg-5 col-12 slogan'>
      <h1>MovieSwipe</h1>
      <img className='col-3' src={logo}></img>
    <div className="col-12 px-5 box">
      <Form onSubmit={handleSubmit}> 
        <Form.Group controlId="email">
          <Form.Control
          placeholder="Email"
            autoFocus
            type="email"
            value={email}
            onChange={(e : any) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="username">
          <Form.Control
          placeholder="Username"
            autoFocus
            type="username"
            value={username}
            onChange={(e : any) => setUsername(e.target.value)}
          />
        </Form.Group> 
        <Form.Group controlId="password">
          <Form.Control
          placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" disabled={!validateForm()}>
          Register
        </Button>
      </Form>
    </div>
    </div>


</div>
  );
}

export default Register;