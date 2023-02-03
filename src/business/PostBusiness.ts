import { Post, PostInputDTO } from "../model/post";
import { generateId } from "../services/generateId";
import { PostRepository } from "./PostRepository";

export class PostBusiness {

    constructor (private postDatabase: PostRepository) {}

    public createPost = async (input: PostInputDTO) => {
        try{
            const {photo, description, type, authorId} = input;

            console.log(authorId)

            const id: string = generateId();
            const createdAt: Date = new Date();

            const post: Post = {
                id: id,
                photo: photo,
                description: description,
                type: type,
                authorId: authorId,
                createdAt: createdAt
            }

            await this.postDatabase.createPost(post)
        }
        catch (error:any){
            console.log(error)
        }
    }

    public getPost = async (id: string) => {
        try {
            const searchResult = await this.postDatabase.getPost(id)
            
            if (!searchResult[0]) {
                const message = "Post not found"
                throw new Error(message)
            }

            const post: Post = {
                id: searchResult[0].id,
                photo: searchResult[0].photo,
                description: searchResult[0].description,
                type: searchResult[0].type,
                createdAt: searchResult[0].created_at,
                authorId: searchResult[0].author_id,
            }

            return post
        }
        catch (error:any){
            console.log(error)
        }
    }


}