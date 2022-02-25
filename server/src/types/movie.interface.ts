import {Document} from 'mongoose'

export interface IMovie extends Document
 {
    likes: number[];
}