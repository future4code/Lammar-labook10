"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const PostBusiness_1 = require("../../business/PostBusiness");
const PostDatabase_1 = require("../../data/mySQL/PostDatabase");
const PostController_1 = require("../PostController");
exports.postRouter = express_1.default.Router();
const postDatabase = new PostDatabase_1.PostDatabase;
const postBusiness = new PostBusiness_1.PostBusiness(postDatabase);
const postController = new PostController_1.PostController(postBusiness);
exports.postRouter.post("/create", (req, res) => postController.createPost(req, res));
exports.postRouter.get("/:id", (req, res) => postController.getPost(req, res));
