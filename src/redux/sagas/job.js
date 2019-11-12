import { takeLatest } from 'redux-saga/effects'
import { get, pick } from 'lodash'
import { GET_JOB, GET_JOBS, CREATE_JOB, UPDATE_JOB, DELETE_JOB, APPLY_JOB }
  from '../modules/job'
import apiCall from '../api/apiCall'

const doGetJob = apiCall({
  type: GET_JOB,
  method: 'get',
  path: ({ payload }) => `/jobs/${payload.id}/`
})

const doGetJobs = apiCall({
  type: GET_JOBS,
  method: 'get',
  path: () => `/jobs/`,
  payloadOnSuccess: (res, { payload }) => ({
    ...res,
    ...pick(get(payload, 'params', {}), ['from', 'to', 'page', 'page_size']),
  })
})

const doCreateJob = apiCall({
  type: CREATE_JOB,
  method: 'post',
  path: () => `/jobs/`
})

const doUpdateJob = apiCall({
  type: UPDATE_JOB,
  method: 'put',
  path: ({ payload }) => `/jobs/${payload.id}/`
})

const doApplyJob = apiCall({
  type: APPLY_JOB,
  method: 'put',
  path: ({ payload }) => `/jobs/apply/${payload.id}/`
})

const doDeleteJob = apiCall({
  type: DELETE_JOB,
  method: 'delete',
  path: ({ payload }) => `/jobs/${payload.id}`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id })
})

export default function* rootSaga () {
  yield takeLatest(GET_JOB, doGetJob)
  yield takeLatest(GET_JOBS, doGetJobs)
  yield takeLatest(CREATE_JOB, doCreateJob)
  yield takeLatest(UPDATE_JOB, doUpdateJob)
  yield takeLatest(DELETE_JOB, doDeleteJob)
  yield takeLatest(APPLY_JOB, doApplyJob)
}
