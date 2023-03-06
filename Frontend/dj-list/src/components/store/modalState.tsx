import { createAsyncThunk, createSlice , PayloadAction} from "@reduxjs/toolkit";
import {IUser, IToken} from "../../interfaces/UserInterfaces";
import axios from "axios";


const initialState={
    modalShow:false,
    youtubeLink:"",
    trackTitle:"",
}


const modalState = createSlice({
    name:"modalState",
    initialState:initialState,
    reducers:{

        modalShow(state){
            state.modalShow = true
        },
        modalHide(state){
            state.modalShow = false
        },
        setYoutubeLink(state, action:PayloadAction<{link:string, trackTitle:string}>){
            state.youtubeLink = action.payload.link;
            state.trackTitle = action.payload.trackTitle;
        }
    }
})

export default modalState.reducer;
export const {modalShow, modalHide, setYoutubeLink} = modalState.actions;