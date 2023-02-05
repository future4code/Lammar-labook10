import { FeedRepository } from "../../business/FeedRepository";
import { BaseDatabase } from "./BaseDatabase";
import { FriendshipDatabase } from "./FriendshipDatabase";


export class FeedDatabase extends BaseDatabase implements FeedRepository {
    private postsTable = 'labook_posts'

    public async getFeed(friendlist: string[]): Promise<any> {
        try{
            FeedDatabase.connection.initialize()
            const queryResult = await FriendshipDatabase.connection(this.postsTable)
            .whereIn('author_id', friendlist)
            
            return queryResult

        }
        catch (error:any){
            throw new Error (error.message)
        }
    }

}