import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRegistration from './registration.reducer';

export const selectRegistrationState = createFeatureSelector<fromRegistration.State>(
  fromRegistration.registrationFeatureKey
);
