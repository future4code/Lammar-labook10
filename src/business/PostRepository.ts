import { Post } from "../model/post";

export interface PostRepository {
    createPost(post:Post):Promise<void>,
    getPost(id: string):Promise<any>
}