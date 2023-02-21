import { UserRepository } from "../../business/UserRepository";
import { User } from "../../model/user";
import { BaseDatabase } from "./BaseDatabase";



export class UserDatabase extends BaseDatabase implements UserRepository {
    private userTable = 'labook_users'
    
    public createUser = async (user: User): Promise<void> => {
        try {
            UserDatabase.connection.initialize()
            await UserDatabase.connection.insert({
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password
            }).into(this.userTable)
        }
        catch (error:any) {
            console.log(error.message)
            throw new Error(error.message)
        }
        finally{
            console.log("Conexão encerrada")
            UserDatabase.connection.destroy()
        }
    }
}