import React, { useState } from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import {registerUser} from "./../api"
import './Login.css'


export const Register = ()=> {
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
    <div className="col-12 box">
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
  );
}

export default Register;