"use client";

import { Provider } from "react-redux";
import { store } from "@/store/global-app-store";

export default function GlobalAppStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
