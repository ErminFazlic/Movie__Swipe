import React, { useState } from "react"
import { Button } from "react-bootstrap";
import { likeMovie, dislikeMovie, getMatches, getLikedMovies, getMovie } from "../api";
import { useNavigate } from "react-router-dom";

export const Movies = () => {
    const JSONmovie: any = localStorage.getItem('JSONmovie')
    const username: any = localStorage.getItem('username')
    const navigate = useNavigate()
    let movie : any = null
    if (JSONmovie != null) {
        movie = JSON.parse(JSONmovie)
    }


    function handleLike(event: any) {
        event.preventDefault();

        const response = likeMovie(username, movie.name)
        response.then(res => {
            if (res.status === "401") {
                alert(res.message)
            }
            else if (res.status === "400") {
                alert(res.message)
            }
            else {
                alert("The following friends have also liked " + movie.name + ":"+res.message)
                updateMovie()
            }
        })
    }

    function handleDislike(event: any) {
        event.preventDefault();

        const response = dislikeMovie(username, movie.name)
        response.then(res => {
            if (res.status === "401") {
                alert(res.message)
            }
            else if (res.status === "400") {
                alert(res.message)
            }
            else {
                alert(res.message)
                updateMovie()
            }
        })
    }
    function updateMovie() {
        const response3 = getMovie(username)
        response3.then(res3=>{
          localStorage.setItem('JSONmovie', res3.message)
          navigate('/home')
        })
       
    }
    return (



        <div>
            {movie != null &&
                <><h2>{movie.name}</h2><img src={movie.imgUrl}></img><h3>{movie.release}</h3><h3>{movie.genre}</h3><Button onClick={handleLike}>Like</Button><Button onClick={handleDislike}>Dislike</Button></>
            }
            {movie === null &&
                <h2>More movies coming soon!</h2>
            }
            
        </div>
    );
}

export default Movies;