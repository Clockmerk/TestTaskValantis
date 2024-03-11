import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { LC_redux, getInitialState } from "./initialState";
import { paginateReducer } from "./slices/paginateSlice";
import { paginateFReducer } from "./slices/paginateFSlice";
import { queryReducer } from "./slices/querySlice";
import { apiReducer, apiSlice } from "./slices/apiSlice";
import { filterReducer } from "./slices/filterSlice";

const rootReducer = combineReducers({
  paginate: paginateReducer,
  paginateF: paginateFReducer,
  query: queryReducer,
  filter: filterReducer,
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
