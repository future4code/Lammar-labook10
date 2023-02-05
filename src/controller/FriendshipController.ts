import {Request, Response} from "express";
import { FriendshipInputDTO } from "../model/friendship";
import { FriendshipBusiness } from "../business/FriendshipBusiness";


export class FriendshipController {

    constructor(private friendshipBusiness : FriendshipBusiness) {}

    public createFriendship = async (req: Request, res: Response) => {
        try {
            const {accountId, friendId} = req.body;

            const input: FriendshipInputDTO = {
                accountId,
                friendId
            }

            await this.friendshipBusiness.createFriendship(input)

            res.status(201).send({ message: "Amizade criada com sucesso"})
        }
        catch (error:any) {
            res.status(400).send(error.message)
        }
    }

    public deleteFriendship = async (req:Request, res: Response) => {
        try {
            const {accountId, friendId} = req.body;

            const input: FriendshipInputDTO = {
                accountId,
                friendId
            }

            await this.friendshipBusiness.deleteFriendship(input)

            res.status(200).send({ message: "Amizade deletada com sucesso"})

        }
        catch (error:any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }
}