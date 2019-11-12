import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail, requestPending } from '../api/request'
import { omit, reject } from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_USER = 'GET_USER'
export const GET_USERS = 'GET_USERS'
export const CREATE_USER = 'CREATE_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const DELETE_USER = 'DELETE_USER'
export const SEARCH_USER = 'SEARCH_USER'
export const GET_USER_REPORT = 'GET_USER_REPORT'

// ------------------------------------
// Actions
// ------------------------------------

export const getUser = createAction(GET_USER)
export const getUsers = createAction(GET_USERS)
export const createUser = createAction(CREATE_USER)
export const updateUser = createAction(UPDATE_USER)
export const deleteUser = createAction(DELETE_USER)
export const searchUser = createAction(SEARCH_USER)
export const getReport = createAction(GET_USER_REPORT)

const initialState = {
  user: null,
  status: 'INIT',
  users: [],
  params: {
    count: 0,
    previous: null,
    next: null,
    page_size: 10,
    page: 1
  },
  report: null,
  loading: false,
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({

  [requestPending(GET_USER)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_USER),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_USER)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_USER),
    user: payload,
    error: null,
    loading: false
  }),

  [requestFail(GET_USER)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_USER),
    error: payload,
    loading: false
  }),

  [requestPending(GET_USERS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_USERS),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_USERS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_USERS),
    users: Object.values(payload),
    params: {
      ...state.params,
      ...omit(payload, 'results')
    },
    error: null,
    loading: false
  }),

  [requestFail(GET_USERS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_USERS),
    error: payload,
    loading: false
  }),

  [requestPending(SEARCH_USER)]: (state, { payload }) => ({
    ...state,
    status: requestPending(SEARCH_USER),
    error: null,
    loading: true,
  }),

  [requestSuccess(SEARCH_USER)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(SEARCH_USER),
    users: Object.values(payload),
    params: {
      ...state.params,
      ...omit(payload, 'results')
    },
    error: null,
    loading: false
  }),

  [requestFail(SEARCH_USER)]: (state, { payload }) => ({
    ...state,
    status: requestFail(SEARCH_USER),
    error: payload,
    loading: false
  }),

  [requestPending(CREATE_USER)]: (state, { payload }) => ({
    ...state,
    status: requestPending(CREATE_USER),
    error: null,
    loading: true,
  }),
  
  [requestSuccess(CREATE_USER)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CREATE_USER),
    user: payload,
    error: null,
    loading: false
  }),

  [requestFail(CREATE_USER)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CREATE_USER),
    error: payload,
    loading: false
  }),

  [requestPending(UPDATE_USER)]: (state, { payload }) => ({
    ...state,
    status: requestPending(UPDATE_USER),
    error: null,
    loading: true,
  }),
  
  [requestSuccess(UPDATE_USER)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(UPDATE_USER),
    user: payload,
    error: null,
    loading: false
  }),

  [requestFail(UPDATE_USER)]: (state, { payload }) => ({
    ...state,
    status: requestFail(UPDATE_USER),
    error: payload,
    loading: false
  }),

  [requestPending(DELETE_USER)]: (state, { payload }) => ({
    ...state,
    status: requestPending(DELETE_USER),
    error: null,
    loading: true,
  }),
  
  [requestSuccess(DELETE_USER)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(DELETE_USER),
    users: reject(state.users, { id: payload.id }),
    params: {
      ...state.params,
      count: Math.max(state.params.count - 1, 0),
    },
    error: null,
    loading: false
  }),

  [requestFail(DELETE_USER)]: (state, { payload }) => ({
    ...state,
    status: requestFail(DELETE_USER),
    error: payload,
    loading: false
  }),

  [requestPending(GET_USER_REPORT)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_USER_REPORT),
    error: null,
    loading: true,
  }),
  
  [requestSuccess(GET_USER_REPORT)]: (state, { payload }) => ({
    ...state,
    report: payload,
    loading: false
  }),

  [requestFail(GET_USER_REPORT)]: (state) => ({
    ...state,
    report: null,
    loading: false
  })

}, initialState)
