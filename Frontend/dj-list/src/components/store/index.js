import { configureStore } from "@reduxjs/toolkit";
import userState from "./userState";
import userLists from "./userLists";
const store = configureStore({
    reducer:{
        userData:userState,
        useLists:userLists,
    }
})

export default store;