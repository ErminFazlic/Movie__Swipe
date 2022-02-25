import { Response, Request } from "express"
import {IUser} from './../types/user.interface'
import User from './../model/user'
import { toUnicode } from "punycode"
import { brotliDecompressSync } from "zlib"

const addUser = async (req:Request, res: Response):Promise<void> => {
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

        

        const allUsers: IUser[] = await User.find()

        allUsers.forEach(element => {
            if(element.email=== body.email && element.password === body.password){
                res.status(200).send(element.username)
            }
        });
        res.status(401).json({message:'Wrong email or password'})

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

        const allUsers: IUser[] = await User.find()
        let user: any= null
        let userToAdd: any = null
        allUsers.forEach(element => {
            if(element.email === body.email){
                user = element
            }
            if(element.username === usernameToAdd){
                userToAdd = element
            }
        });

        user.friends.push(userToAdd._id)
        userToAdd.friends.push(user._id)
        
        const updateUser: IUser | null = await User.findByIdAndUpdate(user._id, user)
        const updateUserToAdd: IUser | null = await User.findByIdAndUpdate(userToAdd._id, userToAdd)

        res.status(200).json({message:'Added friend'})
    }catch(e: any){
        res.status(500).send(e.message);
    }
}



export {addUser, loginUser, addFriend}