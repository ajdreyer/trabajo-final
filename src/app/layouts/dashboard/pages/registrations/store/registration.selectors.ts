import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRegistration from './registration.reducer';

export const selectRegistrationState = createFeatureSelector<fromRegistration.State>(
  fromRegistration.registrationFeatureKey
);

export const selectRegistrationsList = createSelector(selectRegistrationState, (s) => s.registrations);

export const selectLoadingRegistrations = createSelector(selectRegistrationState, (s) => s.loadingRegistrations);

export const selectRegistrationError = createSelector(selectRegistrationState, (s) => s.error);

export const selectCousesList = createSelector(selectRegistrationState, (s) => s.courses);

export const selectStudentsList = createSelector(selectRegistrationState, (s) => s.students);

export const selectLoadingRegistrationModal = createSelector(selectRegistrationState, (s) => s.loadingRegistrationModal);