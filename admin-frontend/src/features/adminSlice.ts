import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { adminUser, initAdminUser } from "../type/admin";

let adminUserSlice = createSlice({
    name : 'adminUser',
    initialState : initAdminUser,
    reducers : {
        loginAdminUser : (state, action:PayloadAction<adminUser>) =>{
            return action.payload;
        },
        logout : () =>{
            return initAdminUser;
        }
    }
})

export const {loginAdminUser, logout} = adminUserSlice.actions;

export default adminUserSlice.reducer;