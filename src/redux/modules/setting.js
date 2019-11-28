import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail, requestPending } from '../api/request'
import { omit, reject } from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_SETTING = 'GET_SETTING'
export const GET_SETTINGS = 'GET_SETTINGS'
export const CREATE_SETTING = 'CREATE_SETTING'
export const UPDATE_SETTING = 'UPDATE_SETTING'
export const DELETE_SETTING = 'DELETE_SETTING'
export const SET_SETTINGS_PAGINATION = 'SET_SETTINGS_PAGINATION'

// ------------------------------------
// Actions
// ------------------------------------

export const getSetting = createAction(GET_SETTING)
export const getSettings = createAction(GET_SETTINGS)
export const createSetting = createAction(CREATE_SETTING)
export const updateSetting = createAction(UPDATE_SETTING)
export const deleteSetting = createAction(DELETE_SETTING)

const initialState = {
  setting: null,
  status: 'INIT',
  settings: {},
  loading: false,
}
const convert = (setting) => {
  var json = {}
  if (setting.length) {
    setting.map((item, index) => (
      json[item.key] = item.value  
    ))
  }
  return json
}
// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [requestPending(GET_SETTING)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_SETTING),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_SETTING)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_SETTING),
    setting: payload,
    error: null,
    loading: false
  }),
  
  [requestFail(GET_SETTING)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_SETTING),
    error: payload,
    loading: false
  }),

  [requestPending(GET_SETTINGS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_SETTINGS),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_SETTINGS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_SETTINGS),
    settings: convert(Object.values(payload)),
    error: null,
    loading: false
  }),

  [requestFail(GET_SETTINGS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_SETTINGS),
    error: payload,
    loading: false
  }),

  [requestPending(CREATE_SETTING)]: (state, { payload }) => ({
    ...state,
    status: requestPending(CREATE_SETTING),
    error: null,
    loading: true,
  }),

  [requestSuccess(CREATE_SETTING)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CREATE_SETTING),
    setting: payload,
    error: null,
    loading: false
  }),

  [requestFail(CREATE_SETTING)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CREATE_SETTING),
    error: payload,
    loading: false
  }),

  [requestPending(UPDATE_SETTING)]: (state, { payload }) => ({
    ...state,
    status: requestPending(UPDATE_SETTING),
    error: null,
    loading: true,
  }),

  [requestSuccess(UPDATE_SETTING)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(UPDATE_SETTING),
    setting: payload,
    error: null,
    loading: false
  }),

  [requestFail(UPDATE_SETTING)]: (state, { payload }) => ({
    ...state,
    status: requestFail(UPDATE_SETTING),
    error: payload,
    loading: false
  }),

  [requestPending(DELETE_SETTING)]: (state, { payload }) => ({
    ...state,
    status: requestPending(DELETE_SETTING),
    error: null,
    loading: true,
  }),

  [requestSuccess(DELETE_SETTING)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(DELETE_SETTING),
    settings: reject(state.settings, { id: payload.id }),
    params: {
      ...state.params,
      count: Math.max(state.params.count - 1, 0),
    },
    error: null,
    loading: false
  }),

  [requestFail(DELETE_SETTING)]: (state, { payload }) => ({
    ...state,
    status: requestFail(DELETE_SETTING),
    error: payload,
    loading: false
  }),

}, initialState)
