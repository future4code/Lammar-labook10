import { FriendshipDatabase } from "../data/mySQL/FriendshipDatabase";
import { Post } from "../model/post";
import { FeedRepository } from "./FeedRepository";

export class FeedBusiness {

    constructor(private feedDatabase: FeedRepository) {}

    private toPost(input:any): Post {
        return {
            id: input.id,
            photo: input.photo,
            description: input.description,
            type: input.type,
            createdAt: input.created_at,
            authorId: input.author_id
        }
        
    }

    public getFeed = async (accountId: string): Promise<Post[]> => {
        try {
            const friendshipDatabase = new FriendshipDatabase;
            const friendlist = await friendshipDatabase.getFriendlist(accountId)
            const result = await this.feedDatabase.getFeed(friendlist)

            const feed = result.map(this.toPost)
            feed.sort((a: any,b:any) =>  b.createdAt - a.createdAt)
            console.log(feed)
            return feed

        } catch (error:any) {
            throw Error("Algo deu errado")
        }
    }

}