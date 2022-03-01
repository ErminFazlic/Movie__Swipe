import React, { useState } from "react"
import { Form, Button } from "react-bootstrap";
import { addFriend } from "../api";


export const Home = () => {
    const email: any = localStorage.getItem('email')
    const [friendsUsername, setFriendsUsername] = useState("");

    function validateForm() {
        return friendsUsername.length > 0
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        const response = addFriend(email, friendsUsername)
        response.then(res => {
            if ( res.message === 'Could not find user') {
                alert("We couldn't find a user with that username")
            }
            else if(res.message === 'You have already added that user as a friend'){
                alert(res.message)
            }
            else if(res.status === "500"){
                alert("Something went wrong please try again")
            }
            else {
                alert("Added friend")
            }
        })
    }

    return (
        <div>
            <h1>Welcome home {email}</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Friend's username</Form.Label>
                    <Form.Control
                        autoFocus
                        type="username"
                        value={friendsUsername}
                        onChange={(e: any) => setFriendsUsername(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit" disabled={!validateForm()}>
                    Add friend
                </Button>
            </Form>
        </div>
    );
}

export default Home;


