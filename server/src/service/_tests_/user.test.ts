import { IUser } from "../../types/user.interface";
import User from '../../model/user'
import {deleteFriend,getFriends,addUser}from "../../service/user.service";
import * as us from "../../service/user.service";
import express, { Request, Response} from "express";
import {Document } from 'mongoose'

test("Add a new user", () => {
    const req = {
        body: {
            email: "valeria@",
            password:  "6666",
            username:  "valeria",
        }
      }

    const res = {
      }

    const response = addUser(req as express.Request, res as express.Response)
   response.then(res=>{
        expect(res.statusCode).toBe(201)
    }).catch((e : any) => fail(e.message));
     
}   
);

