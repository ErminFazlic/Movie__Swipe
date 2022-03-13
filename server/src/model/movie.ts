import {IMovie} from './../types/movie.interface'
import {model, Schema} from 'mongoose'

const movieSchema: Schema = new Schema({
    name:{
        type: String,
        required: true
    },
    genre:{
        type: String,
        required: true
    },
    imgUrl:{
        type: String,
        required: true
    },
    release:{
        type: Number,
        required: true
    },
    likes:{
        type: Array,
        required: true
    },
}, {timestamps: true})

export default model<IMovie>('Movie', movieSchema)
