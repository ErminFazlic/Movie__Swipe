import { useState } from "react"
import { Form, Button } from "react-bootstrap";
import { changePassword } from "../api";
import { useNavigate } from "react-router-dom";



export const Profile = () => {
    const email: any = localStorage.getItem('email')
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
        navigate('/')
    }


    return (

        <div className="container">

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


