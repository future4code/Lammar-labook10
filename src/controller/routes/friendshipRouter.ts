import express from "express";
import { FriendshipDatabase } from "../../data/mySQL/FriendshipDatabase";
import { FriendshipBusiness } from "../../business/FriendshipBusiness";
import { FriendshipController } from "../FriendshipController";


export const friendshipRouter = express.Router()

const friendshipDatabase = new FriendshipDatabase;
const friendshipBusiness = new FriendshipBusiness(friendshipDatabase)
const friendshipController = new FriendshipController(friendshipBusiness);


friendshipRouter.post("/create", (req,res) => friendshipController.createFriendship(req,res))
friendshipRouter.delete("/", (req,res) => friendshipController.deleteFriendship(req, res))