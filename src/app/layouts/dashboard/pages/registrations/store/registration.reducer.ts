import { createFeature, createReducer, on } from '@ngrx/store';
import { RegistrationActions } from './registration.actions';

export const registrationFeatureKey = 'registration';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(RegistrationActions.loadRegistrations, state => state),
  on(RegistrationActions.loadRegistrationsSuccess, (state, action) => state),
  on(RegistrationActions.loadRegistrationsFailure, (state, action) => state),
);

export const registrationFeature = createFeature({
  name: registrationFeatureKey,
  reducer,
});

