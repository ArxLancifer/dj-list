import { configureStore } from "@reduxjs/toolkit";
import userState from "./userState";
import userLists from "./userLists";
import modalState from "./modalState";
const store = configureStore({
    reducer:{
        userData:userState,
        useLists:userLists,
        modalState:modalState,
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>