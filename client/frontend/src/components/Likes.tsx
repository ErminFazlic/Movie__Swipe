import { useState } from "react"
import { Button } from "react-bootstrap";
import { removeLike, getLikedMovies } from "../api";
import { useNavigate } from "react-router-dom";
import './Likes.css'

export const Likes = () => {
    const username: any = localStorage.getItem('username')
    const likedMovies: any = localStorage.getItem('likedMovies')
    const navigate = useNavigate()

    let movieList: IMovie[] = []


    if (likedMovies != null) {
        movieList = JSON.parse(likedMovies)
    }


    function removeLikedMovie(item: any) {
        const response = removeLike(username, item.item._id)

        response.then(res => {
            if (res.status === '401') {
                alert(res.message)
            } else if (res.status === '500') {
                alert(res.message)
            } else {
                alert("Successfully removed " + item.item.name + " from your liked list")
                updateList()
            }
        })
    }
    function updateList() {
        const response = getLikedMovies(username)
        response.then(res => {
            localStorage.setItem('likedMovies', res.message)
            navigate('/likes')
        })
    }

    return (

        <div className="container">
            <h3 className="text-center">Liked movies, click to remove!</h3>
            <div className="d-flex justify-content-center">
                
                <table className="">
                    <tbody>
                        {movieList.map(item => {
                            return (
                                <tr >
                                    <td><Button className="my-1 btn-primary-1" onClick={() => removeLikedMovie({ item })}>{item.name}</Button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default Likes;


