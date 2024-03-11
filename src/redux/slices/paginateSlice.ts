import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState";

export const paginateSlice = createSlice({
  name: "paginate",
  initialState: initialState.paginate,
  reducers: {
    setPaginate: (_, action) => {
      return action.payload;
    },
  },
});

export const { setPaginate } = paginateSlice.actions;
export const paginateReducer = paginateSlice.reducer;
