import { useSelector, type TypedUseSelectorHook } from "react-redux";
import type { RootState } from "@fintrack/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
