import { CustomError } from "../error/CustomError";
import { InvalidDeleteRequest } from "../error/FriendshipErrors";
import { Friendship, FriendshipInputDTO, FriendshipDeleteRequest} from "../model/friendship";
import { generateId } from "../services/generateId";
import { FriendshipRepository } from "./FriendshipRepository";

export class FriendshipBusiness {

    constructor (private friendshipDatabase: FriendshipRepository) {}

    public createFriendship = async (input: FriendshipInputDTO) => {
        try{
            const {accountId, friendId} = input;

            const id: string = generateId();

            const friendship: Friendship  = {
                id: id,
                accountId: accountId,
                friendId: friendId
            }

            await this.friendshipDatabase.createFriendship(friendship)
        }
        catch (error:any){
            throw new Error(error.message)
        }
    }

    public deleteFriendship = async (input: FriendshipInputDTO) => {

        try{
            const {accountId, friendId} = input;

            const friendshipDeleteRequest: FriendshipDeleteRequest = {
                accountId: accountId,
                friendId: friendId
            }

            const friendlist = await this.friendshipDatabase.getFriendlist(accountId)

            if(friendlist.includes(friendId)){
                console.log(friendshipDeleteRequest)
                await this.friendshipDatabase.deleteFriendship(friendshipDeleteRequest)
            } else {
                throw new InvalidDeleteRequest()
            }
        }
        catch (error:any){
            throw new CustomError(error.statuscode, error.message)
        }
    }


}