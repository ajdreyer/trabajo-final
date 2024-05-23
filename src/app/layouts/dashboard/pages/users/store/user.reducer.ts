import { createFeature, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { IRol, IUser } from '../models';
import { IPerson } from '../../people/models';

export const userFeatureKey = 'user';

export interface State {
  loadingUsers: boolean,
  users: IUser[],
  error: unknown,
  loadingUserModal:boolean,
  personas: IPerson[],
  roles:IRol[]
}

export const initialState: State = {
  loadingUsers: false,
  users:[],
  error: null,
  loadingUserModal: false,
  personas: [],
  roles: []
};

export const reducer = createReducer(
  initialState,
  on(UserActions.loadUsers, state => {
    return {
      ...state,
      loadingUsers: true
    }
  }),
  on(UserActions.loadUsersSuccess, (state, action) => {
    return {
      ...state,
      users: action.data,
      loadingUsers: false
    }
  }),
  on(UserActions.loadUsersFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loadingUsers: false
    }
  }),
  on(UserActions.createUsers, (state) => {
    return {
      ...state,
      loadingUsers: true,
    };
  }),

  on(UserActions.createUsersSuccess, (state, action) => {
    return {
      ...state,
      loadingUsers: false,
      users: [...state.users, action.data],
    };
  }),
  on(UserActions.createUsersFailure, (state, action) => {
    return {
      ...state,
      loadingUsers: false,
      error: action.error,
    };
  }),
  on(UserActions.updateUsers, (state) => {
    return {
      ...state,
      loadingUsers: true,
    };
  }),

  on(UserActions.updateUsersSuccess, (state, action) => {
    return {
      ...state,
      loadingUsers: false,
      users: [...state.users, action.data],
    };
  }),
  on(UserActions.updateUsersFailure, (state, action) => {
    return {
      ...state,
      loadingUsers: false,
      error: action.error,
    };
  }),
  on(UserActions.deleteUsersById, (state) => ({
    ...state,
    loadingUsers: true,
  })),
  on(UserActions.deleteUsersByIdSuccess, (state, action) => ({
    ...state,
    loadingUsers: false,
    users: state.users.filter((el) => el.id !== action.data.id),
  })),
  on(UserActions.deleteUsersByIdFailure, (state, action) => ({
    ...state,
    loadingUsers: false,
    error: action.error,
  })),
  on(UserActions.loadPersonas, state => {
    return {
      ...state,
      loadingUserModal: true
    }
  }),
  on(UserActions.loadPersonasSuccess, (state, action) => {
    return {
      ...state,
      personas: action.data,
      loadingUserModal: false
    }
  }),
  on(UserActions.loadPersonasFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loadingUserModal: false
    }
  }),
  on(UserActions.loadRoles, state => {
    return {
      ...state,
      loadingUserModal: true
    }
  }),
  on(UserActions.loadRolesSuccess, (state, action) => {
    return {
      ...state,
      roles: action.data,
      loadingUserModal: false
    }
  }),
  on(UserActions.loadRolesFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loadingUserModal: false
    }
  })
);

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer,
});

