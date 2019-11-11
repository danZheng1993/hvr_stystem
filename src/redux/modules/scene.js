import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail, requestPending } from '../api/request'
import { omit, reject } from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_SCENE = 'GET_SCENE'
export const GET_SCENES = 'GET_SCENES'
export const CREATE_SCENE = 'CREATE_SCENE'
export const UPDATE_SCENE = 'UPDATE_SCENE'
export const DELETE_SCENE = 'DELETE_SCENE'
export const SET_SCENES_PAGINATION = 'SET_SCENES_PAGINATION'

// ------------------------------------
// Actions
// ------------------------------------

export const getScene = createAction(GET_SCENE)
export const getScenes = createAction(GET_SCENES)
export const createScene = createAction(CREATE_SCENE)
export const updateScene = createAction(UPDATE_SCENE)
export const deleteScene = createAction(DELETE_SCENE)

const initialState = {
  scene: null,
  status: 'INIT',
  scenes: {},
  loading: false,
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [requestPending(GET_SCENE)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_SCENE),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_SCENE)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_SCENE),
    scene: payload,
    error: null,
    loading: false
  }),
  
  [requestFail(GET_SCENE)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_SCENE),
    error: payload,
    loading: false
  }),

  [requestPending(GET_SCENES)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_SCENES),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_SCENES)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_SCENES),
    scenes: Object.values(payload),
    error: null,
    loading: false
  }),

  [requestFail(GET_SCENES)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_SCENES),
    error: payload,
    loading: false
  }),

  [requestPending(CREATE_SCENE)]: (state, { payload }) => ({
    ...state,
    status: requestPending(CREATE_SCENE),
    error: null,
    loading: true,
  }),

  [requestSuccess(CREATE_SCENE)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CREATE_SCENE),
    scene: payload,
    error: null,
    loading: false
  }),

  [requestFail(CREATE_SCENE)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CREATE_SCENE),
    error: payload,
    loading: false
  }),

  [requestPending(UPDATE_SCENE)]: (state, { payload }) => ({
    ...state,
    status: requestPending(UPDATE_SCENE),
    error: null,
    loading: true,
  }),

  [requestSuccess(UPDATE_SCENE)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(UPDATE_SCENE),
    scene: payload,
    error: null,
    loading: false
  }),

  [requestFail(UPDATE_SCENE)]: (state, { payload }) => ({
    ...state,
    status: requestFail(UPDATE_SCENE),
    error: payload,
    loading: false
  }),

  [requestPending(DELETE_SCENE)]: (state, { payload }) => ({
    ...state,
    status: requestPending(DELETE_SCENE),
    error: null,
    loading: true,
  }),

  [requestSuccess(DELETE_SCENE)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(DELETE_SCENE),
    scenes: reject(state.scenes, { id: payload.id }),
    params: {
      ...state.params,
      count: Math.max(state.params.count - 1, 0),
    },
    error: null,
    loading: false
  }),

  [requestFail(DELETE_SCENE)]: (state, { payload }) => ({
    ...state,
    status: requestFail(DELETE_SCENE),
    error: payload,
    loading: false
  }),

}, initialState)
