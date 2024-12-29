
export interface registerRequest{
    userName: string,
    password: string
    email: string,
    isAuthenticated: boolean
    name: string
    role: UserRole
}


export interface UserRole {
    roleId: number;
}