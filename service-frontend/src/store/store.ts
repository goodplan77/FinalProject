import { configureStore } from "@reduxjs/toolkit";
import boardSlice from "../features/boardSlice";
import memoSlice from "../features/memoSlice";
import userSlice from "../features/userSlice";
import modalSlice from "../features/modalSlice";

const store = configureStore({
    reducer: {
        boards: boardSlice,
        memos: memoSlice,
        user : userSlice,
        modal : modalSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;