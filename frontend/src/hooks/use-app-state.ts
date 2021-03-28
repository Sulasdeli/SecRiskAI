import {TypedUseSelectorHook, useSelector, shallowEqual} from "react-redux";
import {RootState} from "../reducers/store";

const useAppState: TypedUseSelectorHook<RootState> = <TSelected>(
    fn: (state: RootState) => TSelected,
    equalityFn: (left: TSelected, right: TSelected) => boolean = shallowEqual
) => useSelector(fn, equalityFn);

export default useAppState;
