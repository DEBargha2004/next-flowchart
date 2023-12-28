import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PayloadActionType = {
  h: number;
  w: number;
};

const windowDimension = createSlice({
  name: "window-dimension",
  initialState: {
    w: 0,
    h: 0,
  },
  reducers: {
    setWindowDimension(state, action: PayloadAction<PayloadActionType>) {
      state.h = action.payload.h;
      state.w = action.payload.w;
    },
  },
});

export const { setWindowDimension } = windowDimension.actions;

export default windowDimension.reducer;
