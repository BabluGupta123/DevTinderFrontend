import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addFeed: (state, action) => action.payload,
    removeFromFeed: (state, action) =>
      state.filter((user) => user._id !== action.payload),
    clearFeed: () => [],
  },
});

export const { addFeed, removeFromFeed, clearFeed } = feedSlice.actions;
export default feedSlice.reducer;
