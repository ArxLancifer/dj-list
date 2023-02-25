export interface ISignUp {
    username:string;
    email:string;
    password:string;
    password2:string
} 

export interface IUser {
    name:string;
    email:string;
    id:string;
    userTokens:object;
    isAuth:boolean;
}