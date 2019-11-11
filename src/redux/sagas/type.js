import { takeLatest } from 'redux-saga/effects'
import { get, pick } from 'lodash'
import { GET_TYPE, GET_TYPES, CREATE_TYPE, UPDATE_TYPE, DELETE_TYPE }
  from '../modules/type'
import apiCall from '../api/apiCall'

const doGetType = apiCall({
  type: GET_TYPE,
  method: 'get',
  path: ({ payload }) => `/types/${payload.id}/`
})

const doGetTypes = apiCall({
  type: GET_TYPES,
  method: 'get',
  path: () => `/types/`,
  payloadOnSuccess: (res, { payload }) => ({
    ...res,
    payload
  })
})

const doCreateType = apiCall({
  type: CREATE_TYPE,
  method: 'post',
  path: () => `/types/`
})

const doUpdateType = apiCall({
  type: UPDATE_TYPE,
  method: 'put',
  path: ({ payload }) => `/types/${payload.id}/`
})

const doDeleteType = apiCall({
  type: DELETE_TYPE,
  method: 'delete',
  path: ({ payload }) => `/types/${payload.id}`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id })
})

export default function* rootSaga () {
  yield takeLatest(GET_TYPE, doGetType)
  yield takeLatest(GET_TYPES, doGetTypes)
  yield takeLatest(CREATE_TYPE, doCreateType)
  yield takeLatest(UPDATE_TYPE, doUpdateType)
  yield takeLatest(DELETE_TYPE, doDeleteType)
}
