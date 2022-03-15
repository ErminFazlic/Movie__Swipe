import { Response, Request } from "express"
import {IUser} from './../types/user.interface'
import User from './../model/user'

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

        const user : any = await User.findOne({email: body.email})

        if (user == null){
            res.status(401).json({message:'Wrong email or password'})
        }else{
            if(user.password != body.password){
                res.status(401).json({message:'Wrong email or password'}) 
            }
            res.status(200).json({message:user.username})
        }

    }catch(e: any){
        res.status(500).send(e.message);
    }
}

const changePassword = async (req:Request, res: Response):Promise<any> => {
    try{

        const body = req.body as Pick<IUser, 'email'|'password'>
        const user : any = await User.findOne({email: body.email})

        if (user == null){
            res.status(401).json({message:'Not logged in'})
        }else{
            user.password = body.password
            const updateUser: IUser | null = await User.findByIdAndUpdate(user._id, user)
            res.status(200).json({message: 'Updated password'})
        }

    }catch(e:any){
        res.status(500).send(e.message)
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
        //finds users based on id that is also in users friendslist
        const friends : any = await User.find({ _id: {$in: user.friends}})
        res.status(200).json({message:JSON.stringify(friends)})
        

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
        
        //turn the objectID to string then compare with the friends ID to remove it
        user.friends = user.friends.filter((item: any) => item.toString() !== userIDToRemove)
        
        const updateUser: IUser | null = await User.findByIdAndUpdate(user._id, user)

        res.status(200).json({message:'Removed friend'})

    }catch(e: any){
        res.status(500).send(e.message);
    }
}



export {addUser, loginUser, addFriend, getFriends, deleteFriend, changePassword}