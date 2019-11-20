import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail, requestPending } from '../api/request'
import { omit, reject } from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_BANNER = 'GET_BANNER'
export const GET_BANNERS = 'GET_BANNERS'
export const CREATE_BANNER = 'CREATE_BANNER'
export const UPDATE_BANNER = 'UPDATE_BANNER'
export const DELETE_BANNER = 'DELETE_BANNER'
export const SET_BANNERS_PAGINATION = 'SET_BANNERS_PAGINATION'

// ------------------------------------
// Actions
// ------------------------------------

export const getBanner = createAction(GET_BANNER)
export const getBanners = createAction(GET_BANNERS)
export const createBanner = createAction(CREATE_BANNER)
export const updateBanner = createAction(UPDATE_BANNER)
export const deleteBanner = createAction(DELETE_BANNER)

const initialState = {
  banner: null,
  status: 'INIT',
  banners: {},
  loading: false,
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [requestPending(GET_BANNER)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_BANNER),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_BANNER)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_BANNER),
    banner: payload,
    error: null,
    loading: false
  }),
  
  [requestFail(GET_BANNER)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_BANNER),
    error: payload,
    loading: false
  }),

  [requestPending(GET_BANNERS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_BANNERS),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_BANNERS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_BANNERS),
    banners: Object.values(payload),
    error: null,
    loading: false
  }),

  [requestFail(GET_BANNERS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_BANNERS),
    error: payload,
    loading: false
  }),

  [requestPending(CREATE_BANNER)]: (state, { payload }) => ({
    ...state,
    status: requestPending(CREATE_BANNER),
    error: null,
    loading: true,
  }),

  [requestSuccess(CREATE_BANNER)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CREATE_BANNER),
    banner: payload,
    error: null,
    loading: false
  }),

  [requestFail(CREATE_BANNER)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CREATE_BANNER),
    error: payload,
    loading: false
  }),

  [requestPending(UPDATE_BANNER)]: (state, { payload }) => ({
    ...state,
    status: requestPending(UPDATE_BANNER),
    error: null,
    loading: true,
  }),

  [requestSuccess(UPDATE_BANNER)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(UPDATE_BANNER),
    banner: payload,
    error: null,
    loading: false
  }),

  [requestFail(UPDATE_BANNER)]: (state, { payload }) => ({
    ...state,
    status: requestFail(UPDATE_BANNER),
    error: payload,
    loading: false
  }),

  [requestPending(DELETE_BANNER)]: (state, { payload }) => ({
    ...state,
    status: requestPending(DELETE_BANNER),
    error: null,
    loading: true,
  }),

  [requestSuccess(DELETE_BANNER)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(DELETE_BANNER),
    banners: reject(state.banners, { id: payload.id }),
    params: {
      ...state.params,
      count: Math.max(state.params.count - 1, 0),
    },
    error: null,
    loading: false
  }),

  [requestFail(DELETE_BANNER)]: (state, { payload }) => ({
    ...state,
    status: requestFail(DELETE_BANNER),
    error: payload,
    loading: false
  }),

}, initialState)
