import express from "express";
import { FeedBusiness } from "../../business/FeedBusiness";
import { FeedDatabase } from "../../data/mySQL/FeedDatabase";
import { FeedController } from "../FeedController";


export const feedRouter = express.Router()

const feedDatabase = new FeedDatabase;
const feedBusiness = new FeedBusiness(feedDatabase);
const feedController = new FeedController(feedBusiness);


feedRouter.get("/", (req, res) => feedController.getFeed(req,res))