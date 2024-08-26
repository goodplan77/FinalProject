import { combineReducers, configureStore } from "@reduxjs/toolkit";
import boardSlice from "../features/boardSlice";
import memoSlice from "../features/memoSlice";
import userSlice from "../features/userSlice";
import modalSlice from "../features/modalSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
    boards: boardSlice,
    memos: memoSlice,
    user : userSlice,
    modal : modalSlice
})

const persistConfig = {
    key : "root",
    storage,
    witelist : ["user"]
};

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
    reducer: persistedReducer
});

export type RootState = ReturnType<typeof store.getState>;
export default store;