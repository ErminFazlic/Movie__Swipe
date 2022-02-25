import {Document } from 'mongoose'

export interface IUser extends Document {
    email: string;
    password: string;
    username: string;
    liked: number[];
    disliked: number[];
    friends: number[];
  }