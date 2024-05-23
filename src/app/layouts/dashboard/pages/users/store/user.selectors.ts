import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';

export const selectUserState = createFeatureSelector<fromUser.State>(
  fromUser.userFeatureKey
);

export const selectUsersList = createSelector(selectUserState, (s) => s.users);

export const selectLoadingUsers = createSelector(selectUserState, (s) => s.loadingUsers);

export const selectUsersError = createSelector(selectUserState, (s) => s.error);

export const selectPersonasList = createSelector(selectUserState, (s) => s.personas);

export const selectRolesList = createSelector(selectUserState, (s) => s.roles);

export const selectLoadingUsersModal = createSelector(selectUserState, (s) => s.loadingUserModal);