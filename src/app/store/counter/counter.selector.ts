import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ICounterState, counterFeatureName } from "./counter.reducer";

export const counterState = createFeatureSelector<ICounterState>(counterFeatureName)

export const counterValue = createSelector(counterState, (state) => state.value);