import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStudent from './student.reducer';

export const selectStudentState = createFeatureSelector<fromStudent.State>(
  fromStudent.studentFeatureKey
);

export const selectStudentsList = createSelector(selectStudentState, (s) => s.students);

export const selectRegistrationsByStudentList = createSelector(selectStudentState, (s) => s.registrationsByStudentId);

export const selectLoadingStudents = createSelector(selectStudentState, (s) => s.loadingStudents);

export const selectStudentError = createSelector(selectStudentState, (s) => s.error);

export const selectPersonasList = createSelector(selectStudentState, (s) => s.personas);

export const selectLoadingStudentModal = createSelector(selectStudentState, (s) => s.loadingStudentModal);