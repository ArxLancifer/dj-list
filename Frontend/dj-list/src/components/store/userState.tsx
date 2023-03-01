import { createSlice , PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../interfaces/UserInterfaces";

const initialState = {
    userInfo:{
        name:"",
        email:"",
        id:"",
        userTokens:{},
        isAuth:false,
    },
}

const userData = createSlice({
    name:"userData",
    initialState:initialState,

    reducers:{
       logInUser(state, action:PayloadAction<IUser>){
        state.userInfo = {...action.payload};
       },
       isAuth(state, action:PayloadAction<{id:string, name:string, isAuth:boolean}>){
           state.userInfo.id = action.payload.id;
           state.userInfo.name = action.payload.name;
           state.userInfo.isAuth = action.payload.isAuth;
    },
       logOutUser(state){
        console.log("dispatch did run");
       },


    }
})

export default userData.reducer;
export const {logInUser, logOutUser} = userData.actions;

