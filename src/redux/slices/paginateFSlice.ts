import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState";

export const paginateFSlice = createSlice({
  name: "paginateF",
  initialState: initialState.paginateF,
  reducers: {
    setPaginateF: (_, action) => {
      return action.payload;
    },
  },
});

export const { setPaginateF } = paginateFSlice.actions;
export const paginateFReducer = paginateFSlice.reducer;
