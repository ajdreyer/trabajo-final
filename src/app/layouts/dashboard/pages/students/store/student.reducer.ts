import { createFeature, createReducer, on } from '@ngrx/store';
import { StudentActions } from './student.actions';
import { IStudent } from '../models';
import { state } from '@angular/animations';
import { Action } from 'rxjs/internal/scheduler/Action';
import { IPerson } from '../../people/models';
import { ICourse } from '../../courses/models';

export const studentFeatureKey = 'student';

export interface State {
  loadingStudents: boolean,
  students: IStudent[],
  error: unknown,
  loadingStudentModal:boolean,
  personas: IPerson[]
}

export const initialState: State = {
  loadingStudents: false,
  students: [],
  error: null,
  loadingStudentModal: false,
  personas: []
};

export const reducer = createReducer(
  initialState,
  on(StudentActions.loadStudents, state => {
    return {
      ...state,
      loadingStudents: true
    }
  }),
  on(StudentActions.loadStudentsSuccess, (state, action) => {
    return {
      ...state,
      students: action.data,
      loadingStudents: false
    }
  }),
  on(StudentActions.loadStudentsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loadingStudents: false
    }
  }),
  on(StudentActions.createStudent, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(StudentActions.createStudentSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      students: [...state.students, action.data],
    };
  }),
  on(StudentActions.createStudentFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),
  on(StudentActions.updateStudent, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(StudentActions.updateStudentSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      students: [...state.students, action.data],
    };
  }),
  on(StudentActions.updateStudentFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),
  on(StudentActions.deleteStudentById, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(StudentActions.deleteStudentByIdSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    students: state.students.filter((el) => el.id !== action.data.id),
  })),
  on(StudentActions.deleteStudentByIdFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(StudentActions.loadPersonas, state => {
    return {
      ...state,
      loadingStudentModal: true
    }
  }),
  on(StudentActions.loadPersonasSuccess, (state, action) => {
    return {
      ...state,
      personas: action.data,
      loadingStudentModal: false
    }
  }),
  on(StudentActions.loadPersonasFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loadingStudentModal: false
    }
  })
)

export const studentFeature = createFeature({
  name: studentFeatureKey,
  reducer,
});

