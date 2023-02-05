import { FriendshipRepository } from "../../business/FriendshipRepository";
import { BaseDatabase } from "./BaseDatabase";
import { Friendship, FriendshipDeleteRequest } from "../../model/friendship";


export class FriendshipDatabase extends BaseDatabase implements FriendshipRepository {
    private userTable = 'labook_friendships'
    
    public createFriendship = async (friendship: Friendship): Promise<void> => {
        try {
            
            FriendshipDatabase.connection.initialize()
            await FriendshipDatabase.connection.insert({
                id: friendship.id,
                fk_account: friendship.accountId,
                fk_account2: friendship.friendId
            }).into(this.userTable)
        }
        catch (error:any) {
            console.log(error.message)
            throw new Error(error.message)
        }
        finally{
            console.log("Conexão encerrada")
            FriendshipDatabase.connection.destroy()
        }
    }

    public getFriendlist = async (id: string): Promise<string[]> => {
        try {
                        
            FriendshipDatabase.connection.initialize()
            const list1:any = await FriendshipDatabase.connection('labook_friendships')
            .select('fk_account as friend' )
            .where('fk_account2', id)
            
            const list2:any = await FriendshipDatabase.connection('labook_friendships')
            .select('fk_account2 as friend')
            .where('fk_account', id)

            const queryResult = list1.concat(list2).map(
                (id:any) => id.friend
            )

            return(queryResult)
        }
        catch (error:any) {
            console.log(error.message)
            throw new Error(error.message)
        }
    }

    public deleteFriendship = async (friendshipDeleteRequest:FriendshipDeleteRequest): Promise<void> => {
        try{
            const {accountId, friendId} = friendshipDeleteRequest
            FriendshipDatabase.connection.initialize()
            await FriendshipDatabase.connection.raw(`
            DELETE FROM labook_friendships WHERE
                fk_account = ${accountId} AND fk_account2 = ${friendId}
                OR fk_account = ${friendId} AND fk_account2 = ${accountId};
            `)

        }
        catch (error:any) {
            throw new Error(error.message)
        }
        finally{
            console.log("Conexão encerrada")
            FriendshipDatabase.connection.destroy()
        }
    }
    
}