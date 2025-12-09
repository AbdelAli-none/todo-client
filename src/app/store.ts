import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import openCloseHandler from "./features/UI/uiSlice";
import IDsSlice from "./features/IDs/IDsSlice";
import authSlice from "./features/auth/authSlice";

const store = configureStore({
  reducer: {
    openCloseHandler: openCloseHandler,
    IDsSlice,
    authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
