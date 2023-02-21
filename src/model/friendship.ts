export type Friendship = {
    id: string,
    accountId: string,
    friendId: string,
}

export interface FriendshipInputDTO {
    accountId: string,
    friendId: string
}

export type FriendshipDeleteRequest = {
    accountId: string,
    friendId: string
}
