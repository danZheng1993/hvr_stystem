import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail, requestPending } from '../api/request'
import { omit, reject } from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_SUBCATEGORY = 'GET_SUBCATEGORY'
export const GET_SUBCATEGORYS = 'GET_SUBCATEGORYS'
export const CREATE_SUBCATEGORY = 'CREATE_SUBCATEGORY'
export const UPDATE_SUBCATEGORY = 'UPDATE_SUBCATEGORY'
export const DELETE_SUBCATEGORY = 'DELETE_SUBCATEGORY'
export const SET_SUBCATEGORYS_PAGINATION = 'SET_SUBCATEGORYS_PAGINATION'

// ------------------------------------
// Actions
// ------------------------------------

export const getSubcategory = createAction(GET_SUBCATEGORY)
export const getSubcategorys = createAction(GET_SUBCATEGORYS)
export const createSubcategory = createAction(CREATE_SUBCATEGORY)
export const updateSubcategory = createAction(UPDATE_SUBCATEGORY)
export const deleteSubcategory = createAction(DELETE_SUBCATEGORY)

const initialState = {
  subcategory: null,
  status: 'INIT',
  subcategorys: {},
  loading: false,
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [requestPending(GET_SUBCATEGORY)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_SUBCATEGORY),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_SUBCATEGORY)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_SUBCATEGORY),
    subcategory: payload,
    error: null,
    loading: false
  }),
  
  [requestFail(GET_SUBCATEGORY)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_SUBCATEGORY),
    error: payload,
    loading: false
  }),

  [requestPending(GET_SUBCATEGORYS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_SUBCATEGORYS),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_SUBCATEGORYS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_SUBCATEGORYS),
    subcategorys: Object.values(payload),
    error: null,
    loading: false
  }),

  [requestFail(GET_SUBCATEGORYS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_SUBCATEGORYS),
    error: payload,
    loading: false
  }),

  [requestPending(CREATE_SUBCATEGORY)]: (state, { payload }) => ({
    ...state,
    status: requestPending(CREATE_SUBCATEGORY),
    error: null,
    loading: true,
  }),

  [requestSuccess(CREATE_SUBCATEGORY)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CREATE_SUBCATEGORY),
    subcategory: payload,
    error: null,
    loading: false
  }),

  [requestFail(CREATE_SUBCATEGORY)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CREATE_SUBCATEGORY),
    error: payload,
    loading: false
  }),

  [requestPending(UPDATE_SUBCATEGORY)]: (state, { payload }) => ({
    ...state,
    status: requestPending(UPDATE_SUBCATEGORY),
    error: null,
    loading: true,
  }),

  [requestSuccess(UPDATE_SUBCATEGORY)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(UPDATE_SUBCATEGORY),
    subcategory: payload,
    error: null,
    loading: false
  }),

  [requestFail(UPDATE_SUBCATEGORY)]: (state, { payload }) => ({
    ...state,
    status: requestFail(UPDATE_SUBCATEGORY),
    error: payload,
    loading: false
  }),

  [requestPending(DELETE_SUBCATEGORY)]: (state, { payload }) => ({
    ...state,
    status: requestPending(DELETE_SUBCATEGORY),
    error: null,
    loading: true,
  }),

  [requestSuccess(DELETE_SUBCATEGORY)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(DELETE_SUBCATEGORY),
    subcategorys: reject(state.subcategorys, { id: payload.id }),
    params: {
      ...state.params,
      count: Math.max(state.params.count - 1, 0),
    },
    error: null,
    loading: false
  }),

  [requestFail(DELETE_SUBCATEGORY)]: (state, { payload }) => ({
    ...state,
    status: requestFail(DELETE_SUBCATEGORY),
    error: payload,
    loading: false
  }),

}, initialState)
