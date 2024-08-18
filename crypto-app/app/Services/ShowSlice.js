import { createSlice } from "@reduxjs/toolkit";

export const showSlice = createSlice({
  name: "show",
  initialState: {
    value: 10,
  },
  reducers: {
    Show: (state) => {
        state.value = 50;
      },
  },
});

export const { Show } = showSlice.actions;
export default showSlice.reducer;
