import axios, {Axios, AxiosResponse} from 'axios'

const baseUrl: string = 'http://localhost:5000/api/v1'

export const loginUser = async (email:string, password:string): Promise<UserApiDataType> => {
    try{

        const response: AxiosResponse<UserApiDataType> = await axios.put(baseUrl+'/users',  {email:email, password: password})
        return response.data

    }catch(error: any){
        return {message: "Wrong email or password", status: "401"}
    }
}

export const registerUser = async (username:string, email:string, password:string): Promise<UserApiDataType> => {
    try{

        const response: AxiosResponse<UserApiDataType> = await axios.post(baseUrl+'/users', {username:username, email:email, password:password})
        return response.data

    }catch(error:any){
        return {message:"Something went wrong", status: "500"}
    }
}

export const addFriend = async (email:string, userToAdd:string): Promise<UserApiDataType> => {
    try{

        const response: AxiosResponse<UserApiDataType> = await axios.put(baseUrl+'/users/friends/'+userToAdd, {email:email})
        return response.data
        
    }catch(error:any){
        return {message:"Something went wrong", status: "500"}
    }
}

export const getFriends = async(email:string): Promise<UserApiDataType> => {
    try{
        const response: AxiosResponse<UserApiDataType> = await axios.put(baseUrl+'/users/friends', {email:email})
        return response.data

    }catch(error:any){
        return {message:"Something went wrong", status: "500"}
    }
}

export const deleteFriend = async(email:string, userIDToRemove:string): Promise<UserApiDataType> => {
    try{
        const response: AxiosResponse<UserApiDataType> = await axios.put(baseUrl+'/users/friends/remove/'+userIDToRemove, {email:email})
        return response.data

    }catch(error:any){
        return {message:"Something went wrong", status: "500"}
    }
}

export const likeMovie = async(username:string, movieName:string): Promise<MovieApiDataType> => {
    try{
        const response: AxiosResponse<MovieApiDataType> = await axios.put(baseUrl+'/movie/like/'+username, {name:movieName})
        return response.data

    }catch(error:any){
        return {message:"Something went wrong", status:"500"}
    }
}

export const dislikeMovie = async(username:string, movieName:string): Promise<MovieApiDataType> => {
    try{
        const response: AxiosResponse<MovieApiDataType> = await axios.put(baseUrl+'/movie/dislike/'+username, {name:movieName})
        return response.data

    }catch(error:any){
        return {message:"Something went wrong", status:"500"}
    }
}

export const getMatches = async(user:string, friend:string): Promise<MovieApiDataType> => {
    try{
        const response: AxiosResponse<MovieApiDataType> = await axios.get(baseUrl+'/movie/'+user+'/matches/'+friend)
        return response.data

    }catch(error:any){
        return {message:"Something went wrong", status:"500"}
    }
}