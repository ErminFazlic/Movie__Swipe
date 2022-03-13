import React, { useState } from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { loginUser, getFriends, getMovie } from "./../api"
import { useNavigate } from "react-router-dom";
import './Login.css'



export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    localStorage.clear()
    const response = loginUser(email, password)
    response.then(res => {
      if (res.status === "401") {
        alert("Wrong password or email")
      }
      else {
        localStorage.setItem('username', res.message)
        alert("Logged in")
        localStorage.setItem('email', email)
        const response2 = getFriends(email)
        response2.then(res2=>{
          if (res2.status === "500"){
            alert("Wrong")
          }else{
            localStorage.setItem('friends', res2.message)
          }
         
        })
        const response3 = getMovie(res.message)
        response3.then(res3=>{
          localStorage.setItem('JSONmovie', res3.message)
        })

        navigate('/home')
      }
    })
  }

  function navigateToRegister(event: any){
    event.preventDefault();

    navigate('/register')
  }

  return (
    <div className="col-12 px-5 box">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Control
            placeholder="Email"
            autoFocus
            type="email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}

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
          Login
        </Button>
        <Button onClick={navigateToRegister}>
          Register an account
          </Button>
      </Form>

    </div>
  );
}
export default Login;