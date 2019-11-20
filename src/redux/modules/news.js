import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail, requestPending } from '../api/request'
import { omit, reject } from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_NEWS = 'GET_NEWS'
export const GET_NEWSS = 'GET_NEWSS'
export const CREATE_NEWS = 'CREATE_NEWS'
export const UPDATE_NEWS = 'UPDATE_NEWS'
export const DELETE_NEWS = 'DELETE_NEWS'
export const SET_NEWSS_PAGINATION = 'SET_NEWSS_PAGINATION'

// ------------------------------------
// Actions
// ------------------------------------

export const getNews = createAction(GET_NEWS)
export const getNewss = createAction(GET_NEWSS)
export const createNews = createAction(CREATE_NEWS)
export const updateNews = createAction(UPDATE_NEWS)
export const deleteNews = createAction(DELETE_NEWS)

const initialState = {
  news: null,
  status: 'INIT',
  newss: {},
  loading: false,
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [requestPending(GET_NEWS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_NEWS),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_NEWS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_NEWS),
    news: payload,
    error: null,
    loading: false
  }),
  
  [requestFail(GET_NEWS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_NEWS),
    error: payload,
    loading: false
  }),

  [requestPending(GET_NEWSS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_NEWSS),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_NEWSS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_NEWSS),
    newss: Object.values(payload),
    error: null,
    loading: false
  }),

  [requestFail(GET_NEWSS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_NEWSS),
    error: payload,
    loading: false
  }),

  [requestPending(CREATE_NEWS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(CREATE_NEWS),
    error: null,
    loading: true,
  }),

  [requestSuccess(CREATE_NEWS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CREATE_NEWS),
    news: payload,
    error: null,
    loading: false
  }),

  [requestFail(CREATE_NEWS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CREATE_NEWS),
    error: payload,
    loading: false
  }),

  [requestPending(UPDATE_NEWS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(UPDATE_NEWS),
    error: null,
    loading: true,
  }),

  [requestSuccess(UPDATE_NEWS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(UPDATE_NEWS),
    news: payload,
    error: null,
    loading: false
  }),

  [requestFail(UPDATE_NEWS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(UPDATE_NEWS),
    error: payload,
    loading: false
  }),

  [requestPending(DELETE_NEWS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(DELETE_NEWS),
    error: null,
    loading: true,
  }),

  [requestSuccess(DELETE_NEWS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(DELETE_NEWS),
    newss: reject(state.newss, { id: payload.id }),
    params: {
      ...state.params,
      count: Math.max(state.params.count - 1, 0),
    },
    error: null,
    loading: false
  }),

  [requestFail(DELETE_NEWS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(DELETE_NEWS),
    error: payload,
    loading: false
  }),

}, initialState)
