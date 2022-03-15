import {Register} from '../Register'
import {likeMovie} from "../../../../../server/src/service/movie.service";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import { Response, Request } from "express"
import {registerUser} from "../../api"
import express from "express";
jest.useFakeTimers()


test("Register user successfully", () => {
    const req = {
        username: "test",
        email: "test123@example.com",
        password: "example1",
        //navigate: useNavigate()
    }

    const res = {};
    //const response = Register(req as express.Request, res as express.Response)
    //response.then( res =>{
        expect(alert.toString()).toBe("Created account")
    }).catch((e : any) => fail(e.message));
});