import {Router} from "express"
import { likeMovie, dislikeMovie, getMatches } from './../service/movie.service'

const router: Router = Router()

router.put('/like/:loggedInUser', likeMovie)

router.put("/dislike/:loggedInUser", dislikeMovie)

router.get("/:loggedInUser/matches/:friendUser", getMatches)


export default router