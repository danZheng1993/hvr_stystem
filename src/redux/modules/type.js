import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail, requestPending } from '../api/request'
import { omit, reject } from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_TYPE = 'GET_TYPE'
export const GET_TYPES = 'GET_TYPES'
export const CREATE_TYPE = 'CREATE_TYPE'
export const UPDATE_TYPE = 'UPDATE_TYPE'
export const DELETE_TYPE = 'DELETE_TYPE'
export const SET_TYPES_PAGINATION = 'SET_TYPES_PAGINATION'

// ------------------------------------
// Actions
// ------------------------------------

export const getType = createAction(GET_TYPE)
export const getTypes = createAction(GET_TYPES)
export const createType = createAction(CREATE_TYPE)
export const updateType = createAction(UPDATE_TYPE)
export const deleteType = createAction(DELETE_TYPE)

const initialState = {
  type: null,
  status: 'INIT',
  types: [],
  loading: false,
}

function toArray() {
  return Array.from(arguments);
}
// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [requestPending(GET_TYPE)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_TYPE),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_TYPE)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_TYPE),
    type: payload,
    error: null,
    loading: false
  }),
  
  [requestFail(GET_TYPE)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_TYPE),
    error: payload,
    loading: false
  }),

  [requestPending(GET_TYPES)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_TYPES),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_TYPES)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_TYPES),
    types: Object.values(payload),
    error: null,
    loading: false
  }),

  [requestFail(GET_TYPES)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_TYPES),
    error: payload,
    loading: false
  }),

  [requestPending(CREATE_TYPE)]: (state, { payload }) => ({
    ...state,
    status: requestPending(CREATE_TYPE),
    error: null,
    loading: true,
  }),

  [requestSuccess(CREATE_TYPE)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CREATE_TYPE),
    type: payload,
    error: null,
    loading: false
  }),

  [requestFail(CREATE_TYPE)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CREATE_TYPE),
    error: payload,
    loading: false
  }),

  [requestPending(UPDATE_TYPE)]: (state, { payload }) => ({
    ...state,
    status: requestPending(UPDATE_TYPE),
    error: null,
    loading: true,
  }),

  [requestSuccess(UPDATE_TYPE)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(UPDATE_TYPE),
    type: payload,
    error: null,
    loading: false
  }),

  [requestFail(UPDATE_TYPE)]: (state, { payload }) => ({
    ...state,
    status: requestFail(UPDATE_TYPE),
    error: payload,
    loading: false
  }),

  [requestPending(DELETE_TYPE)]: (state, { payload }) => ({
    ...state,
    status: requestPending(DELETE_TYPE),
    error: null,
    loading: true,
  }),

  [requestSuccess(DELETE_TYPE)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(DELETE_TYPE),
    types: reject(state.types, { id: payload.id }),
    params: {
      ...state.params,
      count: Math.max(state.params.count - 1, 0),
    },
    error: null,
    loading: false
  }),

  [requestFail(DELETE_TYPE)]: (state, { payload }) => ({
    ...state,
    status: requestFail(DELETE_TYPE),
    error: payload,
    loading: false
  }),

}, initialState)
