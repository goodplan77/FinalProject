import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import boardSlice from "../features/boardSlice";
import productSlice from "../features/productSlice";
import askSlice from "../features/askSlice";
import reportSlice from "../features/reportSlice";
import adminSlice from "../features/adminSlice";

const store = configureStore({
    reducer: {
        users : userSlice,
        boards : boardSlice,
        products : productSlice,
        asks : askSlice,
        reports : reportSlice,
        admins : adminSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;