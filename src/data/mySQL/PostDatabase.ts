import { PostRepository } from "../../business/PostRepository";
import { Post } from "../../model/post";
import { BaseDatabase } from "./BaseDatabase";



export class PostDatabase extends BaseDatabase implements PostRepository {
    private postTable = 'labook_posts'
        
    public createPost = async (post: Post): Promise<void> => {
        try {
                        
            PostDatabase.connection.initialize()
            await PostDatabase.connection.insert({
                id: post.id,
                photo: post.photo,
                description: post.description,
                created_at: post.createdAt,
                type: post.type,
                author_id : post.authorId
            }).into(this.postTable)
        }
        catch (error:any) {
            console.log(error.message)
            throw new Error(error.message)
        }
        finally{
            console.log("Conexão encerrada")
            PostDatabase.connection.destroy()
        }
    }

    public getPost = async (id: string): Promise<any> => {
        try {
            
            PostDatabase.connection.initialize()
            const queryResult = await PostDatabase.connection(this.postTable).where({ id: id})

            return queryResult
        }
        catch (error:any) {
            console.log(error.message)
            throw new Error(error.message)
        }
        finally{
            console.log("Conexão encerrada")
            PostDatabase.connection.destroy()
        }
    }

}