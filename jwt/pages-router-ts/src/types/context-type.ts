type AppContextType = {
    user: AuthenticatedUser | null,
    setAuthtenticatedUser: (user: AuthenticatedUser | null) => void,
    getAuthtenticatedUser: () => AuthenticatedUser | null,
    logout: () => void,
}