import React, { useState } from "react"
import { Form, Button } from "react-bootstrap";
import { addFriend } from "../api";
import Friends from "./Friends";
import Navigation from "./Navigation";
import { Container } from "react-bootstrap";


export const Home = () => {
    const email: any = localStorage.getItem('email')


    return (
        <div>
            <Navigation />
            <Container>
                <Friends />
            </Container>

        </div>
    );
}

export default Home;


