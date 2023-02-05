
export interface FeedRepository {
    getFeed(friendlist:string[]):Promise<any>,
}