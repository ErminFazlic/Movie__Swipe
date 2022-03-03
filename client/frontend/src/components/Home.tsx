import React, { useState } from "react"
import { Form, Button } from "react-bootstrap";
import { addFriend } from "../api";
import Friends from "./Friends";


export const Home = () => {
    const email: any = localStorage.getItem('email')
  

    return (
        <div>
            <h1>Welcome home {email}</h1>

            <Friends />
        </div>
    );
}

export default Home;


