import {Request, Response} from "express";
import { UserInputDTO } from "../model/user";
import { UserBusiness } from "../business/UserBusiness";


export class UserController {

    constructor(private userBusiness : UserBusiness) {}

    public createUser = async (req: Request, res: Response) => {
        try {
            const {name, email, password} = req.body;

            const input: UserInputDTO = {
                name,
                email,
                password
            }

            await this.userBusiness.createUser(input)

            res.status(201).send({ message: "Usuário criado com sucesso"})
        }
        catch (error:any) {
            res.status(400).send(error.message)
        }
    }
}