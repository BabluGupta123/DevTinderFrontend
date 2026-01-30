import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: [],
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequest: (state, action) =>
      state.filter((req) => req.fromUserId._id !== action.payload),
    clearRequests: () => [],
  },
});

export const { addRequests, removeRequest, clearRequests } =
  requestSlice.actions;

export default requestSlice.reducer;
