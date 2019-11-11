import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail, requestPending } from '../api/request'
import { omit, reject } from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_SERVICE = 'GET_SERVICE'
export const GET_SERVICES = 'GET_SERVICES'
export const CREATE_SERVICE = 'CREATE_SERVICE'
export const UPDATE_SERVICE = 'UPDATE_SERVICE'
export const DELETE_SERVICE = 'DELETE_SERVICE'
export const SET_SERVICES_PAGINATION = 'SET_SERVICES_PAGINATION'

// ------------------------------------
// Actions
// ------------------------------------

export const getService = createAction(GET_SERVICE)
export const getServices = createAction(GET_SERVICES)
export const createService = createAction(CREATE_SERVICE)
export const updateService = createAction(UPDATE_SERVICE)
export const deleteService = createAction(DELETE_SERVICE)

const initialState = {
  service: null,
  status: 'INIT',
  services: {},
  loading: false,
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [requestPending(GET_SERVICE)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_SERVICE),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_SERVICE)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_SERVICE),
    service: payload,
    error: null,
    loading: false
  }),
  
  [requestFail(GET_SERVICE)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_SERVICE),
    error: payload,
    loading: false
  }),

  [requestPending(GET_SERVICES)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_SERVICES),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_SERVICES)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_SERVICES),
    services: Object.values(payload),
    error: null,
    loading: false
  }),

  [requestFail(GET_SERVICES)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_SERVICES),
    error: payload,
    loading: false
  }),

  [requestPending(CREATE_SERVICE)]: (state, { payload }) => ({
    ...state,
    status: requestPending(CREATE_SERVICE),
    error: null,
    loading: true,
  }),

  [requestSuccess(CREATE_SERVICE)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CREATE_SERVICE),
    service: payload,
    error: null,
    loading: false
  }),

  [requestFail(CREATE_SERVICE)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CREATE_SERVICE),
    error: payload,
    loading: false
  }),

  [requestPending(UPDATE_SERVICE)]: (state, { payload }) => ({
    ...state,
    status: requestPending(UPDATE_SERVICE),
    error: null,
    loading: true,
  }),

  [requestSuccess(UPDATE_SERVICE)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(UPDATE_SERVICE),
    service: payload,
    error: null,
    loading: false
  }),

  [requestFail(UPDATE_SERVICE)]: (state, { payload }) => ({
    ...state,
    status: requestFail(UPDATE_SERVICE),
    error: payload,
    loading: false
  }),

  [requestPending(DELETE_SERVICE)]: (state, { payload }) => ({
    ...state,
    status: requestPending(DELETE_SERVICE),
    error: null,
    loading: true,
  }),

  [requestSuccess(DELETE_SERVICE)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(DELETE_SERVICE),
    services: reject(state.services, { id: payload.id }),
    params: {
      ...state.params,
      count: Math.max(state.params.count - 1, 0),
    },
    error: null,
    loading: false
  }),

  [requestFail(DELETE_SERVICE)]: (state, { payload }) => ({
    ...state,
    status: requestFail(DELETE_SERVICE),
    error: payload,
    loading: false
  }),

}, initialState)
