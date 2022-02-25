import React, { useState } from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import {loginUser} from "./../api"
import { useNavigate } from "react-router-dom";



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event:any) {
    event.preventDefault();
    const response = loginUser(email, password)
    response.then(res=>{
        if(res.status==="401"){
            alert("Wrong password or email")
        }
        else{
            alert("Logged in")
            localStorage.setItem('email', email)
            navigate('/home')
        }
    })
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e : any) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}