import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initUser, User } from "../type/user";

let userSlice = createSlice({
    name : 'user',
    initialState : initUser,
    reducers : {
        loginUser : (state, action:PayloadAction<User>) =>{
            return action.payload;
        },
        logout : () =>{
            return initUser;
        }
    }
})

export const {loginUser, logout} = userSlice.actions;

export default userSlice.reducer;