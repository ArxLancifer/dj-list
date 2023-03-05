import { createSlice } from "@reduxjs/toolkit";
import UserLists from "../UserLists";

const listsSlice = createSlice({
    name:'userLists',
    initialState:{
     allLists:[],   
    },
    reducers:{

    }

})


export default listsSlice.reducer;