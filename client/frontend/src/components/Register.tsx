import React, { useState } from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import {registerUser} from "./../api"


export default function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        }
    })
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={username}
            onChange={(e : any) => setUsername(e.target.value)}
          />
        </Form.Group>  
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
          Register
        </Button>
      </Form>
    </div>
  );
}