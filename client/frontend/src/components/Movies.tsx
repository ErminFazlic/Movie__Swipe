import React, { useState } from "react"
import { Form, Button } from "react-bootstrap";
import { likeMovie, dislikeMovie, getMatches, getLikedMovies } from "../api";
import { useNavigate } from "react-router-dom";

export const Movies = () => {
    const email: any = localStorage.getItem('email')
    const friends: any = localStorage.getItem('friends')
    const navigate = useNavigate()
    let friendslist: IUser[] = []

    return (

        <div>
            
        </div>
    );
}

export default Movies;