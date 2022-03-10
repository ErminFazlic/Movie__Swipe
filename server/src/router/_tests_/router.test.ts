import {loginUser} from "../../service/user.service";
import express from "express";
jest.useFakeTimers()

test("Login User", () => {
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