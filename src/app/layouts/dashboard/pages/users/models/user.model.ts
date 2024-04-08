export type UserRole = 'ADMIN' | 'USER'

export interface IUser{
    id:number,
    firstName: string,
    lastName:string,
    email: string,
    createdAt:Date,
    role: UserRole,
    bornDate: Date
}