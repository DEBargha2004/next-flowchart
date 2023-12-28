import nodes from "@/reducers/node";
import edges from "@/reducers/edge";
import windowDimension from "@/reducers/window-resizer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    windowState: windowDimension,
    nodes: nodes,
    edges: edges,
  },
  devTools: true,
});

export type AppStore = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
