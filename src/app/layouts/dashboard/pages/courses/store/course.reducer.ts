import { createFeature, createReducer, on } from '@ngrx/store';
import { CourseActions } from './course.actions';
import { ICourse } from '../models';

export const courseFeatureKey = 'course';

export interface State {
  loadingCourses: boolean,
  courses: ICourse[],
  error: unknown,
}

export const initialState: State = {
  loadingCourses: false,
  courses: [],
  error: null
};

export const reducer = createReducer(
  initialState,
  on(CourseActions.loadCourses, state => {
    return {
      ...state,
      loadingCourses: true
    }
  }),
  on(CourseActions.loadCoursesSuccess, (state, action) => {
    return {
      ...state,
      courses: action.data,
      loadingCourses: false
    }
  }),
  on(CourseActions.loadCoursesFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loadingCourses: false
    }
  }),
  on(CourseActions.createCourses, (state) => {
    return {
      ...state,
      loadingCourses: true,
    };
  }),
  on(CourseActions.createCoursesSuccess, (state, action) => {
    return {
      ...state,
      loadingCourses: false,
      courses: [...state.courses, action.data],
    };
  }),
  on(CourseActions.createCoursesFailure, (state, action) => {
    return {
      ...state,
      loadingCourses: false,
      error: action.error,
    };
  }),
  on(CourseActions.updateCourses, (state) => {
    return {
      ...state,
      loadingCourses: true,
    };
  }),

  on(CourseActions.updateCoursesSuccess, (state, action) => {
    return {
      ...state,
      loadingCourses: false,
      courses: [...state.courses, action.data],
    };
  }),
  on(CourseActions.updateCoursesFailure, (state, action) => {
    return {
      ...state,
      loadingCourses: false,
      error: action.error,
    };
  }),
  on(CourseActions.deleteCoursesById, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(CourseActions.deleteCoursesByIdSuccess, (state, action) => ({
    ...state,
    loadingCourses: false,
    courses: state.courses.filter((el) => el.id !== action.data.id),
  })),
  on(CourseActions.deleteCoursesByIdFailure, (state, action) => ({
    ...state,
    loadingCourses: false,
    error: action.error,
  }))
);

export const courseFeature = createFeature({
  name: courseFeatureKey,
  reducer,
});

