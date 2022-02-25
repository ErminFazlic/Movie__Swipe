import express, {Express} from "express"
import cors from "cors"
import users from "./src/router/users.route"

const app : Express = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/users", users)
app.use("*", (req, res)=> res.status(404).json({error:"not found"}))

export default app