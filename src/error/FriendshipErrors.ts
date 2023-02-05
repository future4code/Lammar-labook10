import { CustomError } from "./CustomError";

export class InvalidDeleteRequest extends CustomError {
    constructor(){
        super(400, "Invalid request, this friendship does not exist. Please check your accountId and friendId")
    }
}

