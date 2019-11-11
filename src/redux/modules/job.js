import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail, requestPending } from '../api/request'
import { omit, reject } from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_JOB = 'GET_JOB'
export const GET_JOBS = 'GET_JOBS'
export const CREATE_JOB = 'CREATE_JOB'
export const UPDATE_JOB = 'UPDATE_JOB'
export const DELETE_JOB = 'DELETE_JOB'
export const SET_JOBS_PAGINATION = 'SET_JOBS_PAGINATION'

// ------------------------------------
// Actions
// ------------------------------------

export const getJob = createAction(GET_JOB)
export const getJobs = createAction(GET_JOBS)
export const createJob = createAction(CREATE_JOB)
export const updateJob = createAction(UPDATE_JOB)
export const deleteJob = createAction(DELETE_JOB)

const initialState = {
  job: null,
  status: 'INIT',
  jobs: {},
  loading: false,
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [requestPending(GET_JOB)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_JOB),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_JOB)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_JOB),
    job: payload,
    error: null,
    loading: false
  }),
  
  [requestFail(GET_JOB)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_JOB),
    error: payload,
    loading: false
  }),

  [requestPending(GET_JOBS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_JOBS),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_JOBS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_JOBS),
    jobs: payload,
    error: null,
    loading: false
  }),

  [requestFail(GET_JOBS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_JOBS),
    error: payload,
    loading: false
  }),

  [requestPending(CREATE_JOB)]: (state, { payload }) => ({
    ...state,
    status: requestPending(CREATE_JOB),
    error: null,
    loading: true,
  }),

  [requestSuccess(CREATE_JOB)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CREATE_JOB),
    job: payload,
    error: null,
    loading: false
  }),

  [requestFail(CREATE_JOB)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CREATE_JOB),
    error: payload,
    loading: false
  }),

  [requestPending(UPDATE_JOB)]: (state, { payload }) => ({
    ...state,
    status: requestPending(UPDATE_JOB),
    error: null,
    loading: true,
  }),

  [requestSuccess(UPDATE_JOB)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(UPDATE_JOB),
    job: payload,
    error: null,
    loading: false
  }),

  [requestFail(UPDATE_JOB)]: (state, { payload }) => ({
    ...state,
    status: requestFail(UPDATE_JOB),
    error: payload,
    loading: false
  }),

  [requestPending(DELETE_JOB)]: (state, { payload }) => ({
    ...state,
    status: requestPending(DELETE_JOB),
    error: null,
    loading: true,
  }),

  [requestSuccess(DELETE_JOB)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(DELETE_JOB),
    jobs: reject(state.jobs, { id: payload.id }),
    params: {
      ...state.params,
      count: Math.max(state.params.count - 1, 0),
    },
    error: null,
    loading: false
  }),

  [requestFail(DELETE_JOB)]: (state, { payload }) => ({
    ...state,
    status: requestFail(DELETE_JOB),
    error: payload,
    loading: false
  }),

}, initialState)
