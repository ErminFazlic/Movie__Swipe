import User from '../model/user'
import SuperTest from "supertest";
import app from '../../server'
import {IUser} from "../types/user.interface"
import {IMovie} from "../types/movie.interface"
jest.useFakeTimers()

const express = require('express')

const request : SuperTest.SuperTest<SuperTest.Test> =
    SuperTest(app);

test("Get matches between two friends",  async() => {
    const user : IUser = new User(
        {id:new Date().valueOf(), email:"ermin@gmail.com", password:"9999", username:"ermino", liked:["1", "2"], disliked:["3"], friends:[]}
    );
    const friend : IUser = new User(
        {id:new Date().valueOf(), email:"ermiin@gmail.com", password:"976999", username:"erimino", liked:["1","2","3"], disliked:[], friends:[]}
    );

    request.get('/').
    send(usertest)
        .end((err: any, res: any) => {
            if (err) throw err;
        });

    request.put("/")
        .then((res) => {
            expect(res.statusCode).toBe(200);
        }).catch((e : any) => fail(e.message));

});