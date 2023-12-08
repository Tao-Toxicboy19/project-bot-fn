import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import loginReducer from "./slices/loginSlice";
import roleReducer from "./slices/roleSlice";

const reducer = {
    loginReducer,
    roleReducer,
};

export const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV === "development",
});

// export type of root state from reducers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();