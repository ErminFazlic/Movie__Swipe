import {Response, Request} from "express";
import {Express} from "express";
import * as SuperTest from "supertest";


import {IUser} from "../../types/user.interface";
import User from '../../model/user';

import * as UserRouter from '../users.route';
import {addUser, loginUser, addFriend, getFriends, deleteFriend} from "../../service/user.service";
import * as UserService from "../../service/user.service";
import router from "../users.route";


//test for router request for adding new user
test("A POST request to /addUser should send a response with code '201' and message 'created user' ", () => {

    
    const listOfUsers: IUser[] = [
        {email: "molly@gmail.com", password: "123", username: "molly", liked: [], disliked: [], friends:[]},
        {email: "test@gmail.com", password: "abc", username: "test", liked: [], disliked: [], friends:[]}
    ];

    class MockUserService implements IUser {
        createTask(description: "add user"): Promise<IUser> {
            //fix this to send a proper request
            new Request()
            
            router.post('/', addUser)
            expect(0).toBe(1);
            return null;
        }

        markDone(): Promise<boolean> {
            expect(0).toBe(1);
            return null;
        }

        getTasks: () => Promise<IUser[]> = async () => {
            return listOfUsers;
        }
    }

    const ts: MockUserService = new MockUserService();

    const router: Express = UserRouter(ts);
    
    const request : SuperTest.SuperTest<SuperTest.Test> = 
            SuperTest(router);
    
    request.get("/").then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(listOfUsers);
        
    })
})
