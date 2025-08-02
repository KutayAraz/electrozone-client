import type { TypedUseSelectorHook } from "react-redux";
import { useSelector } from "react-redux";

import { RootState } from "@/stores/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
