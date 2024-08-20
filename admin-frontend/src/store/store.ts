import { configureStore } from "@reduxjs/toolkit";
import boardSlice from "../features/boardSlice";
import productSlice from "../features/productSlice";

const store = configureStore({
    reducer: {
        boards : boardSlice,
        products : productSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;