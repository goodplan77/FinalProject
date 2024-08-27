import { combineReducers , configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import boardSlice from "../features/boardSlice";
import productSlice from "../features/productSlice";
import askSlice from "../features/askSlice";
import reportSlice from "../features/reportSlice";
import adminSlice from "../features/adminSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import alarmSlice from "../features/alarmSlice";

const reducers = combineReducers({
    users : userSlice,
    boards : boardSlice,
    products : productSlice,
    asks : askSlice,
    reports : reportSlice,
    admins : adminSlice,
    alarm: alarmSlice
});

const persistConfig = {
    key : "root",
    storage,
    whitelist : ["users" , "boards" , "products" , "asks" , "reports" , "admins" , "alarm"]
};

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer
});

export type RootState = ReturnType<typeof store.getState>;
export default store;