import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Modal{
    isOpen : boolean
}

const init:Modal = {
    isOpen : false
}

let modalSlice = createSlice({
    name : 'modal',
    initialState : init,
    reducers : {
        openModal : (state, action:PayloadAction<Modal>)=>{
            return action.payload;
        },
        closeModal : (state, action:PayloadAction<Modal>)=>{
            return action.payload;
        }
    }
})

export const {openModal, closeModal} = modalSlice.actions;

export default modalSlice.reducer;