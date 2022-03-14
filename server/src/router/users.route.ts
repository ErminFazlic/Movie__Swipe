import {Router} from "express"
import {addUser, loginUser, addFriend, getFriends, deleteFriend, changePassword} from './../service/user.service'

const router: Router = Router()

router.post('/', addUser)

router.put("/", loginUser)

router.put("/friends/:usernameToAdd", addFriend)

router.put("/friends", getFriends)

router.put("/friends/remove/:userIDToRemove", deleteFriend)

router.put("/changePassword", changePassword)


export default router