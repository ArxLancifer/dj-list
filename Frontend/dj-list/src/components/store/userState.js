import { createSlice } from "@reduxjs/toolkit";

const userData = createSlice({
    name:"userData",
    initialState:{
        name:"",
        email:"",
        id:""
    },
    reducers:{
       logInUser(state, action){

       },
       logOutUser(state){

       },


    }
})

export default userData.reducer;
export const {logInUser, logOutUser} = userData.actions;

