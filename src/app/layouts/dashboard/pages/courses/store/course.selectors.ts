import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCourse from './course.reducer';

export const selectCourseState = createFeatureSelector<fromCourse.State>(
  fromCourse.courseFeatureKey
);

export const selectCoursesList = createSelector(selectCourseState, (s) => s.courses);

export const selectLoadingCourses = createSelector(selectCourseState, (s) => s.loadingCourses);

export const selectCourseError = createSelector(selectCourseState, (s) => s.error);