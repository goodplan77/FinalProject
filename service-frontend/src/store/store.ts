import { configureStore } from "@reduxjs/toolkit";
import boardSlice from "../features/boardSlice";
import memoSlice from "../features/memoSlice";

const store = configureStore({
    reducer: {
        boards: boardSlice,
        memos: memoSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;