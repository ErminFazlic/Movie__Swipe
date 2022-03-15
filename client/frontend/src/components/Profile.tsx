import { useState } from "react"
import { Form, Button, Row } from "react-bootstrap";
import { changePassword } from "../api";
import { useNavigate } from "react-router-dom";
import './Profile.css'
import { FaAlignCenter } from "react-icons/fa";



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

    function logout() {
        localStorage.clear()
        navigate('/')
    }


    return (

        <div className="container">
            <div className="d-flex justify-content-center">
                <div className="col-lg-4 col-12 changepass mx-5">
                    <h3>Change password</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="password">
                            <Form.Control
                                placeholder="Password"
                                autoFocus
                                type="password"
                                value={newPassword}
                                onChange={(e: any) => setNewPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button type="submit" disabled={!validateForm()}>
                            Change!
                        </Button>
                        <Button onClick={logout}>Logout</Button>
                    </Form>
                </div>
            </div>

        </div>
    );
}

export default Profile;


