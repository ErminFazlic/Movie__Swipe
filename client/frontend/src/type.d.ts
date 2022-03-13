interface IUser {
    _id: string
    email: string
    password: string
    username: string
    liked: string[]
    disliked: string[]
    friends: string[]
}

type UserProps = {
    user: IUser
}

type UserApiDataType = {
    message: string
    status: string
    user?: IUser
}

interface IMovie{
    name : string;
    genre : string;
    imgUrl : string;
    release : number;
    likes: string[];
}

type MovieProps = {
    movie: IMovie
}

type MovieApiDataType = {
    message: string
    status: string
    movie?: IMovie
}

declare module '*.mp4';