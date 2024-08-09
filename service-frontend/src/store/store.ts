import { configureStore } from "@reduxjs/toolkit";
import boardSlice from "../features/boardSlice";

const store = configureStore({
    reducer: {
        boards : boardSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;