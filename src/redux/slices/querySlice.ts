import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState";

export const querySlice = createSlice({
  name: "query",
  initialState: initialState.query,
  reducers: {
    setQuery: (_, action) => {
      return action.payload;
    },
    clearQuery: () => {
      return initialState.query;
    },
  },
});

export const { setQuery, clearQuery } = querySlice.actions;
export const queryReducer = querySlice.reducer;


