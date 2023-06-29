type AuthenticatedUser = {
    username: string,
    authorities: string[]
}

type TokenData = {
    user: AuthenticatedUser,
    token: string
}