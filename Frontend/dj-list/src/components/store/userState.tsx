import { createAsyncThunk, createSlice , PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../interfaces/UserInterfaces";
import axios from "axios";

export const fetchUserThunk = createAsyncThunk("userData/fetchData", async function(){
    try {
        const token: any = JSON.parse(localStorage.getItem('userToken') || '');
        const response = await axios.post("http://localhost:5000/gatekeeper", {token:token.createdUserToken});
        return response.data;
    } catch (error) {
        console.log(error);
    }
})

const initialState = {
    userInfo:{
        name:"",
        email:"",
        id:"",
        userTokens:{},
        isAuth:false,
    },
    fetchStatus:"idle",
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


    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchUserThunk.pending, (state, action) => {
            console.log("Fetch pending")
            state.fetchStatus = 'pending';
          })
          .addCase(fetchUserThunk.fulfilled, (state, action) => {
            const { requestId } = action.meta
           
            state.userInfo.name = "Egw eimai re";
            state.userInfo.id = "9a9asd09asd089";
            state.fetchStatus = 'idle'
            console.log("Fetch fulfilled")
           
          })
          .addCase(fetchUserThunk.rejected, (state, action) => {
            const { requestId } = action.meta;
            state.fetchStatus = 'idle';
            console.log("Fetch rejected");

          })
      },
})

export default userData.reducer;
export const {logInUser, logOutUser} = userData.actions;

