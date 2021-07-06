import { User } from "../models/user"

class UserController {

    findAll = async (req, res, next) => {
        res.status(200)
            .send(await User.find())
            .end()
        next();
    } 

    findById = async (req, res, next) => {
        res.status(200)
            .send(await User.findById(req.params.id))
            .end()
        next();
    } 
}

export const userController = Object.freeze(new UserController());