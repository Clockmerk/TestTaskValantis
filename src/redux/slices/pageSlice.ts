import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState";

export const pageSlice = createSlice({
  name: "page",
  initialState: initialState.page,
  reducers: {
    setPage: (_, action) => {
      return action.payload;
    },
  },
});

export const { setPage } = pageSlice.actions;
export const pageReducer = pageSlice.reducer;


