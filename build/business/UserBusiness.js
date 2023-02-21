"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBusiness = void 0;
const generateId_1 = require("../services/generateId");
class UserBusiness {
    constructor(userDatabase) {
        this.userDatabase = userDatabase;
        this.createUser = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = input;
                const id = (0, generateId_1.generateId)();
                const user = {
                    id: id,
                    name: name,
                    email: email,
                    password: password
                };
                yield this.userDatabase.createUser(user);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.UserBusiness = UserBusiness;
