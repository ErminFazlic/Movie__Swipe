import {Router} from "express"
import { likeMovie, dislikeMovie, getMatches, getLikedMovies, getMovie } from './../service/movie.service'

const router: Router = Router()

router.put('/like/:loggedInUser', likeMovie)

router.put("/dislike/:loggedInUser", dislikeMovie)

router.get("/:loggedInUser/matches/:friendUser", getMatches)

router.get("/:loggedInUser/liked", getLikedMovies)

router.get("/:loggedInUser/movie", getMovie)

export default router