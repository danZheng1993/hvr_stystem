import { takeLatest } from 'redux-saga/effects'
import { get, pick } from 'lodash'
import { GET_SERVICE, GET_SERVICES, CREATE_SERVICE, UPDATE_SERVICE, DELETE_SERVICE }
  from '../modules/service'
import apiCall from '../api/apiCall'

const doGetService = apiCall({
  type: GET_SERVICE,
  method: 'get',
  path: ({ payload }) => `/services/${payload.id}/`
})

const doGetServices = apiCall({
  type: GET_SERVICES,
  method: 'get',
  path: () => `/services/`,
  payloadOnSuccess: (res, { payload }) => ({
    ...res,
    payload
  })
})

const doCreateService = apiCall({
  type: CREATE_SERVICE,
  method: 'post',
  path: () => `/services/`
})

const doUpdateService = apiCall({
  type: UPDATE_SERVICE,
  method: 'put',
  path: ({ payload }) => `/services/${payload.id}/`
})

const doDeleteService = apiCall({
  type: DELETE_SERVICE,
  method: 'delete',
  path: ({ payload }) => `/services/${payload.id}`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id })
})

export default function* rootSaga () {
  yield takeLatest(GET_SERVICE, doGetService)
  yield takeLatest(GET_SERVICES, doGetServices)
  yield takeLatest(CREATE_SERVICE, doCreateService)
  yield takeLatest(UPDATE_SERVICE, doUpdateService)
  yield takeLatest(DELETE_SERVICE, doDeleteService)
}
