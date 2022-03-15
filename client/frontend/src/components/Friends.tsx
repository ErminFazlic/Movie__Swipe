import { useState } from "react"
import { Form, Button } from "react-bootstrap";
import { addFriend, getFriends, deleteFriend, getMatches } from "../api";
import { useNavigate } from "react-router-dom";

export const Friends = () => {
    const email: any = localStorage.getItem('email')
    const friends: any = localStorage.getItem('friends')
    const username: any = localStorage.getItem('username')
    const navigate = useNavigate()
    let friendslist: IUser[] = []


    if (friends != null) {
        friendslist = JSON.parse(friends)
    }

    const [friendsUsername, setFriendsUsername] = useState("");

    function validateForm() {
        return friendsUsername.length > 0
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        const response = addFriend(email, friendsUsername)
        response.then(res => {
            if (res.message === 'Could not find user') {
                alert("We couldn't find a user with that username")
            }
            else if (res.message === 'You have already added that user as a friend') {
                alert(res.message)
            }
            else if (res.status === "500") {
                alert("Something went wrong please try again")
            }
            else {
                alert("Added friend")
                updateList()
            }
        })
    }

    function deleteAFriend( item : any) {
        const response = deleteFriend(email, item.item._id)
        response.then(res=> {
            if (res.status === "500"){
                alert("Something went wrong please try again")
            }else{
                alert("Removed "+ item.item.username + " from friends list")
                updateList()
            }
        })
        
    }
    function viewMatches(item:any){
        if(username!= null){
            const response = getMatches(username, item.item.username)
            response.then(res=>{
                if(res.message === 'No matches'){
                    alert("You and " + item.item.username + " have no matches. Start swiping!")
                }else{
                    alert("You have both liked the following movies: " +res.message)
                }
                
            })
        }  
    }

    function updateList(){
        const response = getFriends(email)
        response.then(res => {
            if (res.status === "500") {
                alert("Wrong")
            } else {
                localStorage.setItem('friends', res.message)
                navigate('/friends')           
            }

        })
    }
    return (

        <div className="container">
            <table>
                <thead>
                    <tr>
                        <th>Friends (Click to remove)</th>
                    </tr>
                </thead>
                <tbody>
                    {friendslist.map(item => {
                        return (
                            <tr >
                                <td><Button onClick={() => viewMatches({item})}>{item.username}</Button><Button onClick={() => deleteAFriend({item})}>Remove Friend</Button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>


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

export default Friends;


