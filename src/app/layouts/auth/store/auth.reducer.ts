import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { IUser } from '../../dashboard/pages/users/models';

export const authFeatureKey = 'auth';

export interface State {
  authUser: null | IUser[];
  error: unknown;
  isLoading: boolean;
}

export const initialState: State = {
  authUser: null,
  error: null,
  isLoading: false
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.loginAuths, state => {
    return {
      ...state,
      isLoading: true
  }
  }),
  on(AuthActions.loginAuthsSuccess, (state, action) => {
    return {
      ...state,
      authUser: action.data,
      isLoading: false
  }
  }),
  on(AuthActions.loginAuthsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      isLoading: false
    }
  }),
);

export const authFeature = createFeature({
  name: authFeatureKey,
  reducer,
});

