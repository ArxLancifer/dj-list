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
       logOutUser(state){
        console.log("dispatch did run");
       },


    }
})

export default userData.reducer;
export const {logInUser, logOutUser} = userData.actions;

