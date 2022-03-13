import User from './model/user'

import SuperTest from "supertest";
import app from "../server"
import {IUser} from "./types/user.interface"

const express = require('express') 
const request : SuperTest.SuperTest<SuperTest.Test> = 
        SuperTest(app);

test("Add a user and login",  async() => {
    jest.useFakeTimers();
    const usertest : IUser = new User(
        {id:new Date().valueOf(), email:"ermin@gmail.com", password:"9999", username:"ermino", liked:[], disliked:[], friends:[]}
    ); 

    request.post('/').
                send(usertest)
                .end((err, res) => {
                    if (err) throw err;
                });

    request.put("/")
            .then((res) => {
            expect(res.statusCode).toBe(200);
             }).catch((e : any) => fail(e.message));
   
   });