import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState";

export const limitSlice = createSlice({
  name: "limit",
  initialState: initialState.limit,
  reducers: {
    setLimit: (_, action) => {
      return action.payload;
    },
  },
});

export const { setLimit } = limitSlice.actions;
export const limitReducer = limitSlice.reducer;


