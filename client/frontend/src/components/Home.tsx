import React, { useState } from "react"
import { Form, Button } from "react-bootstrap";
import { addFriend } from "../api";
import Friends from "./Friends";
import Movies from "./Movies"
import Profile from "./Profile";
import Navigation from "./Navigation";
import { Container } from "react-bootstrap";


export const Home = () => {
    const username: any = localStorage.getItem('username')


    return (
        <div>
            <Navigation />
            <Container>        
                <Movies />
            </Container>

        </div>
    );
}

export default Home;


