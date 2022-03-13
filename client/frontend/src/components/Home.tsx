import React, { useState } from "react"
import { Form, Button } from "react-bootstrap";
import { addFriend } from "../api";
import Friends from "./Friends";
import Movies from "./Movies"
import Profile from "./Profile";


export const Home = () => {
    const username: any = localStorage.getItem('username')
  

    return (
        <div>
            <h1>Welcome home {username}</h1>

            <Friends />
            <Movies />
            <Profile />
        </div>
    );
}

export default Home;


