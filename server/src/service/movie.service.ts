import { Response, Request } from "express"
import { IMovie } from './../types/movie.interface'
import Movie from './../model/movie'
import User from "../model/user"
import { IUser } from "../types/user.interface"

const likeMovie = async (req: Request, res: Response): Promise<void> => {
    try {

        const body = req.body as Pick<IMovie, 'name'>
        const {
            params: { loggedInUser }
        } = req

        const user: any = await User.findOne({ username: loggedInUser })
        const movie: any = await Movie.findOne({ name: body.name })

        if (user === null || user === undefined) {
            res.status(401).json({ message: 'You are not logged in' })
            return
        }
        if (movie === null || movie === undefined) {
            res.status(400).json({ message: 'Something went wrong, try again' })
            return
        }
        user.liked.push(movie._id)
        const updateUser: IUser | null = await User.findByIdAndUpdate(user._id, user)
        const matches = user.friends.filter((value: any) => movie.likes.includes(value))
        if(matches.length === 0){
            res.status(200).json({message: 'No matches'})
        }
        res.status(200).json({ message: JSON.stringify(matches) })

    } catch (e: any) {
        res.status(500).send(e.message);
    }
}

const dislikeMovie = async (req: Request, res: Response): Promise<void> => {
    try {

        const body = req.body as Pick<IMovie, 'name'>
        const {
            params: { loggedInUser }
        } = req

        const user: any = await User.findOne({ username: loggedInUser })
        const movie: any = await Movie.findOne({ name: body.name })

        if (user === null || user === undefined) {
            res.status(401).json({ message: 'You are not logged in' })
            return
        }
        if (movie === null || movie === undefined) {
            res.status(400).json({ message: 'Something went wrong, try again' })
            return
        }
        user.disliked.push(movie._id)
        const updateUser: IUser | null = await User.findByIdAndUpdate(user._id, user)
        res.status(200).json({ message: 'ok' })

    } catch (e: any) {
        res.status(500).send(e.message);
    }
}

const getMatches = async (req: Request, res: Response): Promise<any> => {
    try {

        const {
            params: { loggedInUser, friendUser }
        } = req
        const user: any = await User.findOne({ username: loggedInUser })
        const friend: any = await User.findOne({ username: friendUser })
        if (user === null || user === undefined) {
            res.status(401).json({ message: 'You are not logged in' })
            return
        }
        if (friend === null || friend === undefined) {
            res.status(400).json({ message: 'Something went wrong, try again' })
            return
        }

        const matches = user.liked.filter((value: any) => friend.liked.includes(value))
        if(matches.length === 0){
            res.status(200).json({message: 'No matches'})
            return
        }
        res.status(200).json({message: JSON.stringify(matches)})


    } catch (e: any) {
        res.status(500).send(e.message);
    }
}

const getLikedMovies = async (req: Request, res: Response): Promise<any> => {
    try{
        const{
            params: {loggedInUser}
        } = req

        const user: any = await User.findOne({ username: loggedInUser })
        if (user === null || user === undefined) {
            res.status(401).json({ message: 'You are not logged in' })
            return
        }

        res.status(200).json({message: JSON.stringify(user.liked)})
    }catch(e:any){
        res.status(500).send(e.message);
    }
}

export { likeMovie, dislikeMovie, getMatches, getLikedMovies }