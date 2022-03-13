import {Document} from 'mongoose'

export interface IMovie extends Document
 {
    name : string;
    genre : string;
    imgUrl : string;
    release : number;
}