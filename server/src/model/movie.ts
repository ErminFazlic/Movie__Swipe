import {IMovie} from './../types/movie.interface'
import {model, Schema} from 'mongoose'

const movieSchema: Schema = new Schema({
    likes:{
        type: Array,
        required: true
    },
}, {timestamps: true})

export default model<IMovie>('Movie', movieSchema)
