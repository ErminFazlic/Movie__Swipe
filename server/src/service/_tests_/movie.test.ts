import  {likeMovie, dislikeMovie, getMatches, getLikedMovies, getMovie } from "../movie.service";
import express from "express";
jest.useFakeTimers()

/*
//like a movie
test("Like a movie", () => {
    const req = {
        body: {
            name: "Shawshank Redemption"
        }
    }

    const res = {};
    const response = likeMovie(req as express.Request, res as express.Response)
    response.then(res=>{
        expect(res.statusCode).toBe(200)
    }).catch((e : any) => fail(e.message));
});
*/

//dislike a movie
/*test("Dislike a movie", () => {
    const req = {
        body: {
            name: "Pulp Fiction"
        }
    }
    
    const res = {};
    const response = dislikeMovie(req as express.Request, res as express.Response)
    response.then(res=>{
        expect(res.statusCode).toBe(200)
    }).catch((e : any) => fail(e.message));
});*/

//get matches

test("View all matched movies from 1 friend", () => {
    const req = {
        body: {
            name: "Pulp Fiction"
        }
    }

    const res = {};
    const response = likeMovie(req as express.Request, res as express.Response)
    response.then(res=>{
        expect(res.statusCode).toBe(200)
    }).catch((e : any) => fail(e.message));
});
