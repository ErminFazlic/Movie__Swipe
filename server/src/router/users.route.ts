import {Router} from "express"
import {addUser, loginUser, addFriend} from './../service/user.service'

const router: Router = Router()

router.post('/', addUser)

router.put("/", loginUser)

router.put("/friends/:usernameToAdd", addFriend)


export default router