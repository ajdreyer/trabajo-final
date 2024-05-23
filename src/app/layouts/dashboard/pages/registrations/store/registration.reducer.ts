import { createFeature, createReducer, on } from '@ngrx/store';
import { RegistrationActions } from './registration.actions';
import { IRegistration } from '../models';
import { ICourse } from '../../courses/models';
import { IStudent } from '../../students/models';

export const registrationFeatureKey = 'registration';

export interface State {
  loadingRegistrations: boolean,
  registrations: IRegistration[],
  error: unknown,
  loadingRegistrationModal: boolean,
  courses: ICourse[],
  students: IStudent[]
}

export const initialState: State = {
  loadingRegistrations: false,
  registrations: [],
  error: null,
  loadingRegistrationModal: false,
  courses: [],
  students: []
};

export const reducer = createReducer(
  initialState,
  on(RegistrationActions.loadRegistrations, state => {
    return {
      ...state,
      loadingRegistrations: true
    }
  }),
  on(RegistrationActions.loadRegistrationsSuccess, (state, action) => {
    return {
      ...state,
      registrations: action.data,
      loadingRegistrations: false
    }
  }),
  on(RegistrationActions.loadRegistrationsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loadingRegistrations: false
    }
  }),
  on(RegistrationActions.createRegistrations, (state) => {
    return {
      ...state,
      loadingRegistrations: true,
    };
  }),

  on(RegistrationActions.createRegistrationsSuccess, (state, action) => {
    return {
      ...state,
      loadingRegistrations: false,
      registrations: [...state.registrations, action.data],
    };
  }),
  on(RegistrationActions.createRegistrationsFailure, (state, action) => {
    return {
      ...state,
      loadingRegistrations: false,
      error: action.error,
    };
  }),
  on(RegistrationActions.updateRegistrations, (state) => {
    return {
      ...state,
      loadingRegistrations: true,
    };
  }),

  on(RegistrationActions.updateRegistrationsSuccess, (state, action) => {
    return {
      ...state,
      loadingRegistrations: false,
      registrations: [...state.registrations, action.data],
    };
  }),
  on(RegistrationActions.updateRegistrationsFailure, (state, action) => {
    return {
      ...state,
      loadingRegistrations: false,
      error: action.error,
    };
  }),
  on(RegistrationActions.deleteRegistrationsById, (state) => ({
    ...state,
    loadingRegistrations: true,
  })),
  on(RegistrationActions.deleteRegistrationsByIdSuccess, (state, action) => ({
    ...state,
    loadingRegistrations: false,
    registrations: state.registrations.filter((el) => el.id !== action.data.id),
  })),
  on(RegistrationActions.deleteRegistrationsByIdFailure, (state, action) => ({
    ...state,
    loadingRegistrations: false,
    error: action.error,
  })),
  on(RegistrationActions.loadCourses, state => {
    return {
      ...state,
      loadingRegistrationModal: true
    }
  }),
  on(RegistrationActions.loadCoursesSuccess, (state, action) => {
    return {
      ...state,
      courses: action.data,
      loadingRegistrationModal: false
    }
  }),
  on(RegistrationActions.loadCoursesFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loadingRegistrationModal: false
    }
  }),
  on(RegistrationActions.loadStudents, state => {
    return {
      ...state,
      loadingRegistrationModal: true
    }
  }),
  on(RegistrationActions.loadStudentsSuccess, (state, action) => {
    return {
      ...state,
      students: action.data,
      loadingRegistrationModal: false
    }
  }),
  on(RegistrationActions.loadStudentsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loadingRegistrationModal: false
    }
  }),
  on(RegistrationActions.loadRegistrationsByStudentId, (state) => {
    return {
      ...state,
      loadingRegistrations: true,
    };
  }),

  on(RegistrationActions.loadRegistrationsByStudentIdSuccess, (state, action) => {
    return {
      ...state,
      loadingRegistrations: false,
      registrations: action.data,
    };
  }),
  on(RegistrationActions.loadRegistrationsByStudentIdFailure, (state, action) => {
    return {
      ...state,
      loadingRegistrations: false,
      error: action.error,
    };
  })
);

export const registrationFeature = createFeature({
  name: registrationFeatureKey,
  reducer,
});

