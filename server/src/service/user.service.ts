import { Response, Request } from "express"
import {IUser} from './../types/user.interface'
import User from './../model/user'
import { toUnicode } from "punycode"
import { brotliDecompressSync } from "zlib"
import { ObjectId } from "mongoose/node_modules/mongodb"
import { AnyMxRecord } from "dns"

const addUser = async (req:Request, res: Response):Promise<any> => {
    try{

        const body = req.body as Pick<IUser, 'email' | 'password' | 'username'>

        const user: IUser = new User({
            email: body.email,
            password: body.password,
            username: body.username,
            liked: [],
            disliked: [],
            friends: [],
        })

        const newUser: IUser = await user.save()
        res.status(201).json({message:'created user'})

    }catch(e: any){
        res.status(500).send(e.message);
    }
}

const loginUser = async (req:Request, res: Response):Promise<any> => {
    try{

        const body = req.body as Pick<IUser, 'email' | 'password'>

        const user : any = await User.findOne({email: body.email})

        if (user == null){
            res.status(401).json({message:'Wrong email or password'})
        }else{
            if(user.password != body.password){
                res.status(401).json({message:'Wrong email or password'}) 
            }
            res.status(200).send(user.username)
        }

    }catch(e: any){
        res.status(500).send(e.message);
    }
}

const addFriend = async (req:Request, res:Response):Promise<any> => {
    try{

        const {
            params: {usernameToAdd}
        } = req

        const body = req.body as Pick<IUser, 'email'>

        const user : any = await User.findOne({email:body.email})
        const userToAdd : any = await User.findOne({username:usernameToAdd})

        if(user === null || userToAdd == null){
            res.status(200).json({message: 'Could not find user'})
            return
        }

        if(user.friends.includes(userToAdd._id)){
            res.status(200).json({message: 'You have already added that user as a friend'})
            return
        }
        user.friends.push(userToAdd._id)
        userToAdd.friends.push(user._id)
        
        const updateUser: IUser | null = await User.findByIdAndUpdate(user._id, user)
        const updateUserToAdd: IUser | null = await User.findByIdAndUpdate(userToAdd._id, userToAdd)

        res.status(200).json({message:'Added friend'})
        return
    }catch(e: any){
        res.status(500).send(e.message);
    }
}

const getFriends = async (req:Request, res:Response):Promise<any> => {
    try{

        const body = req.body as Pick<IUser, 'email'>

        const user : any = await User.findOne({email:body.email})
        if(user === null){
            res.status(401).json({message: 'You are not logged in'})
        }
        res.status(200).json({message:JSON.stringify(user.friends)})
        

    }catch(e: any){
        res.status(500).send(e.message);
    }
}

const deleteFriend = async (req:Request, res:Response):Promise<any> => {
    try{

        const {
            params: {userIDToRemove}
        } = req

        const body = req.body as Pick<IUser, 'email'>
        const user : any = await User.findOne({email:body.email})
        if(user === null){
            res.status(401).json({message: 'You are not logged in'})
        }
        console.log(user.friends)
        user.friends.forEach((element: any) => {
            console.log(element.toString())
        });
        user.friends = user.friends.filter((item: any) => item.toString() !== userIDToRemove)
        console.log(user.friends)
        const updateUser: IUser | null = await User.findByIdAndUpdate(user._id, user)

        res.status(200).json({message:'Removed friend'})

    }catch(e: any){
        res.status(500).send(e.message);
    }
}



export {addUser, loginUser, addFriend, getFriends, deleteFriend}