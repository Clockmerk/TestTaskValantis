import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { LC_redux, getInitialState } from "./initialState";
import { pageReducer } from "./slices/pageSlice";
import { limitReducer } from "./slices/limitSlice";
import { queryReducer } from "./slices/querySlice";
import { apiReducer, apiSlice } from "./slices/apiSlice";

const rootReducer = combineReducers({
  page: pageReducer,
  limit: limitReducer,
  query: queryReducer,
  api: apiReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: getInitialState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

store.subscribe(() => {
  localStorage.setItem(LC_redux, JSON.stringify(store.getState()));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
