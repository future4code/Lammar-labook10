import {Request, Response} from "express";
import { FeedBusiness } from "../business/FeedBusiness";

export class FeedController {
    
    constructor(private feedBusiness : FeedBusiness) {}

    public getFeed = async (req: Request, res: Response) => {
        try {
            const {accountId} = req.body;
            
            const feed = await this.feedBusiness.getFeed(accountId)

            res.status(200).send(feed)

        } catch (error:any) {
            res.status(400).send(error.message)
            
        }
    }
}