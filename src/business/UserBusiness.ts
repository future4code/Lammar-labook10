import { User, UserInputDTO } from "../model/user";
import { generateId } from "../services/generateId";
import { UserRepository } from "./UserRepository";

export class UserBusiness {

    constructor (private userDatabase: UserRepository) {}

    public createUser = async (input: UserInputDTO) => {
        try{
            const {name, email, password} = input;

            const id: string = generateId();

            const user: User = {
                id: id,
                name: name,
                email: email,
                password: password
            }

            await this.userDatabase.createUser(user)
        }
        catch (error:any){
            console.log(error)
        }
    }


}