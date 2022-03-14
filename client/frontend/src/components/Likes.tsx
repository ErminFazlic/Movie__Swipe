import React, { useState } from "react"
import { Form, Button } from "react-bootstrap";
import { removeLike, getLikedMovies } from "../api";
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

    function removeLikedMovie( item : any) {
        const response = removeLike(username, item.item._id)

        response.then(res=>{
            if(res.status==='401'){
                alert(res.message)
            }else if(res.status==='500'){
                alert(res.message)
            }else{
                alert("Successfully removed "+ item.item.name + " from your liked list")
                updateList()
            }
        })
    }
    function updateList(){
        const response = getLikedMovies(username)
        response.then(res=>{
          localStorage.setItem('likedMovies', res.message)
          navigate('/likes')
        })  
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
                                <td><Button onClick={() => removeLikedMovie({item})}>{item.name}</Button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Likes;


