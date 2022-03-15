import { Response, Request } from "express"
import { IMovie } from './../types/movie.interface'
import Movie from './../model/movie'
import User from "../model/user"
import { IUser } from "../types/user.interface"
import mongoose from "mongoose"

const likeMovie = async (req: Request, res: Response): Promise<any> => {
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
        movie.likes.push(user._id)

        const updateUser: IUser | null = await User.findByIdAndUpdate(user._id, user)
        const updateMovie: IMovie | null = await Movie.findByIdAndUpdate(movie._id, movie)

        //check if a friend has also liked this movie then return those friends
        const matches = user.friends.filter((value: any) => movie.likes.includes(value))
        if(matches.length === 0){
            res.status(200).json({message: 'No matches'})
        }

        const matchedFriends: any = await User.find({ _id: {$in: matches}})
        let friends: string[] = []

        matchedFriends.forEach((element: { username: string }) => {
            friends.push(element.username)
        });
        res.status(200).json({ message: JSON.stringify(friends) })

    } catch (e: any) {
        res.status(500).send(e.message);
    }
}

const dislikeMovie = async (req: Request, res: Response): Promise<any> => {
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

        //Get the intersection of the two user's liked arrays and then get the movie
        const matches = user.liked.filter((value: any) => friend.liked.includes(value))
        const movies = await Movie.find({_id: {$in: matches}})

        let movieNames : string[] = []
        if(matches.length === 0){
            res.status(200).json({message: 'No matches'})
            return
        }
        movies.forEach(element => {
            movieNames.push(element.name)
        });
        res.status(200).json({message: JSON.stringify(movieNames)})


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
        const movies : any = await Movie.find({ _id: {$in: user.liked}})

        res.status(200).json({message: JSON.stringify(movies)})
    }catch(e:any){
        res.status(500).send(e.message);
    }
}

//Retrieves a movie that the user has not liked/disliked so they can do so
const getMovie = async (req: Request, res: Response): Promise<any> => {
    try{
        const{
            params: {loggedInUser}
        } = req

        const user: any = await User.findOne({ username: loggedInUser })
        if (user === null || user === undefined) {
            res.status(401).json({ message: 'You are not logged in' })
            return
        }
        const movies: any = await Movie.find({})
        if (movies === null || movies === undefined) {
            res.status(500).json({ message: 'Something went wrong' })
            return
        }

        const seenMovies = user.liked.concat(user.disliked)
        if(seenMovies.length < movies.length){
            res.status(200).json({message: JSON.stringify(movies[seenMovies.length])})
            return
        }

        res.status(200).json({message: 'No more movies to show'})
        
    }catch(e:any){
        res.status(500).send(e.message);
    }
}

const removeLike = async (req: Request, res: Response): Promise<any> => {
    try{
        const body = req.body as Pick<IMovie, 'name'>

        const{
            params: {loggedInUser}
        } = req

        const user: any = await User.findOne({ username: loggedInUser })
        if (user === null || user === undefined) {
            res.status(401).json({ message: 'You are not logged in' })
            return
        }

        var id = new mongoose.Types.ObjectId(body.name);

        user.liked = removeItemOnce(user.liked, id)

        const updateUser: IUser | null = await User.findByIdAndUpdate(user._id, user)
        res.status(200).json({ message: 'ok' })
        
    }catch(e:any){
        res.status(500).send(e.message);
    }
}
//helper function for removeLike
function removeItemOnce(arr: any[], value: any) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

export { likeMovie, dislikeMovie, getMatches, getLikedMovies, getMovie, removeLike }