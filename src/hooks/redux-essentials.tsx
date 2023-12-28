import { AppDispatch, AppStore } from "@/store/global-app-store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppState: TypedUseSelectorHook<AppStore> = useSelector;

export const useAppDispatch: () => AppDispatch = useDispatch;
