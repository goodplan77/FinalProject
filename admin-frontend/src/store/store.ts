import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import boardSlice from "../features/boardSlice";
import productSlice from "../features/productSlice";
import askSlice from "../features/askSlice";

const store = configureStore({
    reducer: {
        users : userSlice,
        boards : boardSlice,
        products : productSlice,
        asks : askSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;