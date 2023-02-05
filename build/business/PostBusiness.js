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
exports.PostBusiness = void 0;
const generateId_1 = require("../services/generateId");
class PostBusiness {
    constructor(postDatabase) {
        this.postDatabase = postDatabase;
        this.createPost = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { photo, description, type, authorId } = input;
                console.log(authorId);
                const id = (0, generateId_1.generateId)();
                const createdAt = new Date();
                const post = {
                    id: id,
                    photo: photo,
                    description: description,
                    type: type,
                    authorId: authorId,
                    createdAt: createdAt
                };
                yield this.postDatabase.createPost(post);
            }
            catch (error) {
                console.log(error);
            }
        });
        this.getPost = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const searchResult = yield this.postDatabase.getPost(id);
                if (!searchResult[0]) {
                    const message = "Post not found";
                    throw new Error(message);
                }
                const post = {
                    id: searchResult[0].id,
                    photo: searchResult[0].photo,
                    description: searchResult[0].description,
                    type: searchResult[0].type,
                    createdAt: searchResult[0].created_at,
                    authorId: searchResult[0].author_id,
                };
                return post;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.PostBusiness = PostBusiness;
