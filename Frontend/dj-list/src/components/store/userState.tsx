import { createAsyncThunk, createSlice , PayloadAction} from "@reduxjs/toolkit";
import {IUser, IToken} from "../../interfaces/UserInterfaces";
import axios from "axios";

export const fetchUserThunk = createAsyncThunk("userData/fetchData", async function(){
    // try {
        const token: IToken = JSON.parse(localStorage.getItem('userToken') || '');
        const response = await axios.post("http://localhost:5000/gatekeeper", {token:token.createdUserToken});
        return response.data;
    // } catch (error) {
    //     console.log(error);
    // }
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
        state.userInfo.name = "";
        state.userInfo.id = "";
        state.userInfo.isAuth = false;
        state.userInfo.userTokens = {};
       },


    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchUserThunk.pending, (state, action) => {
            if (state.fetchStatus === 'idle'){
                state.fetchStatus = 'pending';
                console.log("Fetch pending")
            }
          })
          .addCase(fetchUserThunk.fulfilled, (state, action) => {
            const { requestId } = action.meta
            if (state.fetchStatus === 'pending'){
                state.userInfo.name = action.payload.name;
                state.userInfo.id = action.payload.id;
                state.userInfo.isAuth = action.payload.isAuth;
                state.fetchStatus = 'idle';
                console.log("Fetch fulfilled")

            }
           
          })
          .addCase(fetchUserThunk.rejected, (state, action) => {
            const { requestId } = action.meta;
            if(state.fetchStatus === 'pending'){
                state.fetchStatus = 'idle';
                state.userInfo.name = "";
                state.userInfo.id = "";
                console.log("Fetch rejected");
            }

          })
      },
})

export default userData.reducer;
export const {logInUser, logOutUser} = userData.actions;

