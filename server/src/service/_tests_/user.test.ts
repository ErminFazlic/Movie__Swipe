import {addFriend, addUser} from "../user.service";
import express from "express";
//jest.useFakeTimers()

//unit test för varje metod i movie.service user.service, integration test också. frontend testing
test("Register User", () => {
    const req = {
        body: {
            email: "valeria@",
            password:  "6666",
            username:  "valeria",
        }
    }

    const res = {};
    const response = addUser(req as express.Request, res as express.Response)
    response.then(res=>{
        expect(res.statusCode).toBe(201)
    }).catch((e : any) => fail(e.message));
});

/*
test("Add friends", () => {
    const req = {
        body: {
            email: "example@gmail.com"
        }
    }

    const res = {};
    const response = addFriend(req as express.Request, res as express.Response)
    response.then(res=>{
        expect(res.statusCode).toBe(200)
    }).catch((e : any) => fail(e.message));
});*/
