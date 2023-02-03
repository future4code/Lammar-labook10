export type User = {
    id: string,
    name: string,
    email: string,
    password: string
}

export type authenticationData = {
    id: string
}

export interface UserInputDTO {
    name: string,
    email: string,
    password: string
}