import {loginUser} from "../../service/user.service";
import express from "express";
jest.useFakeTimers()

//Log in existing user
test("Login existing user", () => {
    const req = {
        body: {
            email: "valeria@",
            password:  "6666"
        }
    }

    const res = {};
    const response = loginUser(req as express.Request, res as express.Response)
    response.then(res=>{
        expect(res.statusCode).toBe(200)
    }).catch((e : any) => fail(e.message));
});

//Log in non existing user
test("Login non-existing user", () => {
    const req = {
        body: {
            email: "test@example.com",
            password:  "abc"
        }
    }

    const res = {};
    const response = loginUser(req as express.Request, res as express.Response)
    response.then(res=>{
        expect(res.statusCode).toBe(500)
    }).catch((e : any) => fail(e.message));
});