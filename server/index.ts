import app from "./server"
import mongodb from "mongodb"
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

const port = process.env.PORT || 8000

const options = { useNewUrlParser: true, useUnifiedTopology: true }


mongoose.connect(
    process.env.DB_URI!,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
    }   
).then(async client =>{
    app.listen(port, ()=>{
        console.log('listening on port '+port)
    })
})
.catch(error =>{
    console.error(error.stack)
    process.exit(1)
})
