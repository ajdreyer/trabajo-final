import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { counterFeatureName, counterReducer } from "./counter/counter.reducer";
import { localStorageSync } from "ngrx-store-localstorage";

interface IRootState{}

export const rootReducer: ActionReducerMap<IRootState> = {
    [counterFeatureName]: counterReducer,
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({keys: [counterFeatureName], rehydrate:true})(reducer);
  }
 export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];