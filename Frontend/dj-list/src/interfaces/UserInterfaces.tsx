export interface ISignUp {
    username:string;
    email:string;
    password:string;
    password2:string
} 

export interface IState {
    userInfo:object;
    fetchStatus:string;
}

export interface IToken {
    createdUserToken:string;
    refreshToken:string;
}

export interface IUser {
    name:string;
    email:string;
    id:string;
    userTokens:IToken;
    isAuth:boolean;
}

export interface IList {
        _id: string;
        user: {
            username:string;
        };
        name: string;
        genre: string;
}