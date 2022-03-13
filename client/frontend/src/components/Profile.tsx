import React, { useState } from "react"
import { Form, Button } from "react-bootstrap";
import { changePassword } from "../api";
import { Link, useNavigate } from "react-router-dom";
import App from "../App";
import Login from "./Login";


export const Profile = () => {
    const email: any = localStorage.getItem('email')
    const username: any = localStorage.getItem('username')
    const navigate = useNavigate()

    const [newPassword, setNewPassword] = useState("");

    function validateForm() {
        return newPassword.length > 0
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        const response = changePassword(email, newPassword)
        response.then(res => {
            if (res.message === 'Could not find user') {
                alert("We couldn't find a user with that username")
            }
            else if (res.message === 'You have already added that user as a friend') {
                alert(res.message)
            }
            else if (res.status === "401") {
                alert(res.message)
            }
            else {
                alert("Changed password")
                logout()
            }
        })
    }

    function logout(){
        localStorage.clear()
        //ugly and bad practice, could not get react router to work. It just refreshed the same page
        return window.location.href="http://localhost:3000/login"
    }


    return (

        <div>

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="password">
                    <Form.Label>Change password</Form.Label>
                    <Form.Control
                        autoFocus
                        type="password"
                        value={newPassword}
                        onChange={(e: any) => setNewPassword(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit" disabled={!validateForm()}>
                    Change!
                </Button>
            </Form>
            <Button onClick={logout}>Logout</Button>
        </div>
    );
}

export default Profile;


