import { configureStore } from "@reduxjs/toolkit";
import boardSlice from "../features/boardSlice";
import memoSlice from "../features/memoSlice";
import userSlice from "../features/userSlice";

const store = configureStore({
    reducer: {
        boards: boardSlice,
        memos: memoSlice,
        user : userSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;