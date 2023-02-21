import { configureStore } from "@reduxjs/toolkit";
import userState from "./userState";

const store = configureStore({
    reducer:{
        userData:userState
    }
})

export default store;