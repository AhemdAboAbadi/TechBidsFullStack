export interface User {
    id: number,
    name: string,
    isAdmin: boolean,
}

export interface AuthContext {
    user: User | null,
    login: Function,
    logout: Function,
    signup: Function,
}
