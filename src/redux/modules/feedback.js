import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail, requestPending } from '../api/request'
import { omit, reject } from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_FEEDBACK = 'GET_FEEDBACK'
export const GET_FEEDBACKS = 'GET_FEEDBACKS'
export const CREATE_FEEDBACK = 'CREATE_FEEDBACK'
export const UPDATE_FEEDBACK = 'UPDATE_FEEDBACK'
export const DELETE_FEEDBACK = 'DELETE_FEEDBACK'
export const SET_FEEDBACKS_PAGINATION = 'SET_FEEDBACKS_PAGINATION'

// ------------------------------------
// Actions
// ------------------------------------

export const getFeedback = createAction(GET_FEEDBACK)
export const getFeedbacks = createAction(GET_FEEDBACKS)
export const createFeedback = createAction(CREATE_FEEDBACK)
export const updateFeedback = createAction(UPDATE_FEEDBACK)
export const deleteFeedback = createAction(DELETE_FEEDBACK)

const initialState = {
  feedback: null,
  status: 'INIT',
  feedbacks: {},
  loading: false,
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [requestPending(GET_FEEDBACK)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_FEEDBACK),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_FEEDBACK)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_FEEDBACK),
    feedback: payload,
    error: null,
    loading: false
  }),
  
  [requestFail(GET_FEEDBACK)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_FEEDBACK),
    error: payload,
    loading: false
  }),

  [requestPending(GET_FEEDBACKS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_FEEDBACKS),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_FEEDBACKS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_FEEDBACKS),
    feedbacks: Object.values(payload),
    error: null,
    loading: false
  }),

  [requestFail(GET_FEEDBACKS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_FEEDBACKS),
    error: payload,
    loading: false
  }),

  [requestPending(CREATE_FEEDBACK)]: (state, { payload }) => ({
    ...state,
    status: requestPending(CREATE_FEEDBACK),
    error: null,
    loading: true,
  }),

  [requestSuccess(CREATE_FEEDBACK)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CREATE_FEEDBACK),
    feedback: payload,
    error: null,
    loading: false
  }),

  [requestFail(CREATE_FEEDBACK)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CREATE_FEEDBACK),
    error: payload,
    loading: false
  }),

  [requestPending(UPDATE_FEEDBACK)]: (state, { payload }) => ({
    ...state,
    status: requestPending(UPDATE_FEEDBACK),
    error: null,
    loading: true,
  }),

  [requestSuccess(UPDATE_FEEDBACK)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(UPDATE_FEEDBACK),
    feedback: payload,
    error: null,
    loading: false
  }),

  [requestFail(UPDATE_FEEDBACK)]: (state, { payload }) => ({
    ...state,
    status: requestFail(UPDATE_FEEDBACK),
    error: payload,
    loading: false
  }),

  [requestPending(DELETE_FEEDBACK)]: (state, { payload }) => ({
    ...state,
    status: requestPending(DELETE_FEEDBACK),
    error: null,
    loading: true,
  }),

  [requestSuccess(DELETE_FEEDBACK)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(DELETE_FEEDBACK),
    feedbacks: reject(state.feedbacks, { id: payload.id }),
    params: {
      ...state.params,
      count: Math.max(state.params.count - 1, 0),
    },
    error: null,
    loading: false
  }),

  [requestFail(DELETE_FEEDBACK)]: (state, { payload }) => ({
    ...state,
    status: requestFail(DELETE_FEEDBACK),
    error: payload,
    loading: false
  }),

}, initialState)
