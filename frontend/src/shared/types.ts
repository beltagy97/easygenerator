export type AuthUserResponse = {
    email: string;
    username: string;
}

export type AuthResponseType = {
    message: string;
    access_token: string;
    user: AuthUserResponse;
}
