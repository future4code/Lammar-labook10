import { User } from "../model/user";

export interface UserRepository {
    createUser(user:User):Promise<void>
}