import {IUser} from './../types/user.interface'
import {model, Schema} from 'mongoose'

const userSchema: Schema = new Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    liked:{
        type: Array,
        required: true
    },
    disliked:{
        type: Array,
        required: true
    },
    friends:{
        type: Array,
        required: true
    },
}, {timestamps: true})

export default model<IUser>('User', userSchema)