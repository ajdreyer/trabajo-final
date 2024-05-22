import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export const selectAuthUser = createSelector(selectAuthState, (s) => s.authUser);

export const selectAuthError = createSelector(selectAuthState, (s) => s.error);

export const selectAuthIsLoading = createSelector(selectAuthState, (s) => s.isLoading);