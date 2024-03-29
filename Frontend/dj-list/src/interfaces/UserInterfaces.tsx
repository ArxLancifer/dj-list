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
    favoriteLists:any;
    accountSince:string;
    userTokens:IToken;
    userImage:string;
    isAuth:boolean;
}

export interface IList {
        _id: string;
        user: {
            username:string;
            userimage:string;
        };
        name: string;
        genre: string;
        tracks:string[];
        
}

export interface IPublicListCard extends IList{
    createdAt:string;
    usersLiked:[string];
    comments:[string];
}

export interface ITrack {
    _id:string;
    title:string;
    artist:string;
    album:string;
    subGenre:string;
    duration:string;
    BPM:number;
    youtubeLink:string;
}

export interface INewTrack {
    title:string;
    artist:string;
    album:string;
    subGenre:string;
    duration:string;
    BPM:string;
    youtubeLink:string;
}

export interface IComment {
    user:{
        username:string;
        userimage:string;
    };
    commentText:string;
}
