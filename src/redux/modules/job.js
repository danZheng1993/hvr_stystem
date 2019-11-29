import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail, requestPending } from '../api/request'
import { omit, reject, findIndex } from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_JOB = 'GET_JOB'
export const GET_JOBS = 'GET_JOBS'
export const CREATE_JOB = 'CREATE_JOB'
export const UPDATE_JOB = 'UPDATE_JOB'
export const DELETE_JOB = 'DELETE_JOB'
export const APPLY_JOB = 'APPLY_JOB'
export const HIRE_JOB = 'HIRE_JOB'
export const UPDATE_RESULT = 'UPDATE_RESULT'
export const GIVE_FEEDBACK = 'GIVE_FEEDBACK'
export const SEARCH_JOB = 'SEARCH_JOB'
export const SET_JOBS_PAGINATION = 'SET_JOBS_PAGINATION'

// ------------------------------------
// Actions
// ------------------------------------

export const getJob = createAction(GET_JOB)
export const getJobs = createAction(GET_JOBS)
export const createJob = createAction(CREATE_JOB)
export const updateJob = createAction(UPDATE_JOB)
export const deleteJob = createAction(DELETE_JOB)
export const applyJob = createAction(APPLY_JOB)
export const hireJob = createAction(HIRE_JOB)
export const giveFeedback = createAction(GIVE_FEEDBACK)
export const updateResult = createAction(UPDATE_RESULT)
export const searchJob = createAction(SEARCH_JOB)

const initialState = {
  job: null,
  status: 'INIT',
  jobs: [],
  loading: false,
  searchResult: []
}

const refreshResult = (list, update) => {
  console.warn("refresh", update)
  let index = findIndex(list, {_id: update._id})
  list.splice(index, 1, update);
  return list
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
    jobs: Object.values(payload),
    error: null,
    loading: false
  }),

  [requestFail(GET_JOBS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_JOBS),
    error: payload,
    loading: false
  }),

  
  [requestPending(SEARCH_JOB)]: (state, { payload }) => ({
    ...state,
    status: requestPending(SEARCH_JOB),
    error: null,
    loading: true,
  }),

  [requestSuccess(SEARCH_JOB)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(SEARCH_JOB),
    searchResult: Object.values(payload),
    error: null,
    loading: false
  }),

  [requestFail(SEARCH_JOB)]: (state, { payload }) => ({
    ...state,
    status: requestFail(SEARCH_JOB),
    error: payload,
    loading: false
  }),

  [UPDATE_RESULT]: (state, {payload }) => ({
    ...state,
    status: UPDATE_RESULT,
    searchResult: refreshResult(state.searchResult, payload),
    error: null,
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

  [requestPending(APPLY_JOB)]: (state, { payload }) => ({
    ...state,
    status: requestPending(APPLY_JOB),
    error: null,
    loading: true,
  }),

  [requestSuccess(APPLY_JOB)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(APPLY_JOB),
    job: payload,
    error: null,
    loading: false
  }),

  [requestFail(APPLY_JOB)]: (state, { payload }) => ({
    ...state,
    status: requestFail(APPLY_JOB),
    error: payload,
    loading: false
  }),

  [requestPending(HIRE_JOB)]: (state, { payload }) => ({
    ...state,
    status: requestPending(HIRE_JOB),
    error: null,
    loading: true,
  }),

  [requestSuccess(HIRE_JOB)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(HIRE_JOB),
    job: payload,
    error: null,
    loading: false
  }),

  [requestFail(HIRE_JOB)]: (state, { payload }) => ({
    ...state,
    status: requestFail(HIRE_JOB),
    error: payload,
    loading: false
  }),

  [requestPending(GIVE_FEEDBACK)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GIVE_FEEDBACK),
    error: null,
    loading: true,
  }),

  [requestSuccess(GIVE_FEEDBACK)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GIVE_FEEDBACK),
    job: payload,
    error: null,
    loading: false
  }),

  [requestFail(GIVE_FEEDBACK)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GIVE_FEEDBACK),
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
