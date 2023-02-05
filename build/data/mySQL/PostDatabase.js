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
exports.PostDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class PostDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.postTable = 'labook_posts';
        this.createPost = (post) => __awaiter(this, void 0, void 0, function* () {
            try {
                PostDatabase.connection.initialize();
                yield PostDatabase.connection.insert({
                    id: post.id,
                    photo: post.photo,
                    description: post.description,
                    created_at: post.createdAt,
                    type: post.type,
                    author_id: post.authorId
                }).into(this.postTable);
            }
            catch (error) {
                console.log(error.message);
                throw new Error(error.message);
            }
            finally {
                console.log("Conexão encerrada");
                PostDatabase.connection.destroy();
            }
        });
        this.getPost = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                PostDatabase.connection.initialize();
                const queryResult = yield PostDatabase.connection(this.postTable).where({ id: id });
                return queryResult;
            }
            catch (error) {
                console.log(error.message);
                throw new Error(error.message);
            }
            finally {
                console.log("Conexão encerrada");
                PostDatabase.connection.destroy();
            }
        });
    }
}
exports.PostDatabase = PostDatabase;
