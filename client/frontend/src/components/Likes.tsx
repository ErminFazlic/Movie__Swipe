import React, { useState } from "react"
import { Form, Button } from "react-bootstrap";
import { addFriend, getFriends, deleteFriend, getMatches } from "../api";
import { useNavigate } from "react-router-dom";

export const Likes = () => {
    const email: any = localStorage.getItem('email')
    const username: any = localStorage.getItem('username')
    const likedMovies: any = localStorage.getItem('likedMovies')
    const navigate = useNavigate()

    let movieList: IMovie[] = []


    if (likedMovies != null) {
        movieList = JSON.parse(likedMovies)
    }

    const [friendsUsername, setFriendsUsername] = useState("");

    function removeLike( item : any) {
        alert(item.item.name)
        
    }

    return (

        <div className="container">
            <table>
                <thead>
                    <tr>
                        <th>Liked movies, click to remove!</th>
                    </tr>
                </thead>
                <tbody>
                    {movieList.map(item => {
                        return (
                            <tr >
                                <td><Button onClick={() => removeLike({item})}>{item.name}</Button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Likes;


