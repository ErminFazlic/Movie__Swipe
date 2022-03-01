interface IUser {
    _id: string
    email: string
    password: string
    username: string
    liked: number[]
    disliked: number[]
    friends: number[]
}

type UserProps = {
    user: IUser
}

type UserApiDataType = {
    message: string
    status: string
    user?: IUser
}

declare module '*.mp4';