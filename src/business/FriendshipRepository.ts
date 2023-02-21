import { Friendship, FriendshipDeleteRequest } from "../model/friendship";

export interface FriendshipRepository {
    createFriendship(friendship:Friendship):Promise<void>,
    getFriendlist(id:string):Promise<string[]>,
    deleteFriendship(friendshipDeleteRequest:FriendshipDeleteRequest):Promise<void>
}