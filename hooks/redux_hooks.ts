import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppRootState, AppDispatch } from "../redux/store";

// Typed hooks for useSelector and useDispatch
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
