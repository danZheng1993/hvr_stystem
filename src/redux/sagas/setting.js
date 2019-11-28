import { takeLatest } from 'redux-saga/effects'
import { get, pick } from 'lodash'
import { GET_SETTING, GET_SETTINGS, CREATE_SETTING, UPDATE_SETTING, DELETE_SETTING }
  from '../modules/setting'
import apiCall from '../api/apiCall'

const doGetSetting = apiCall({
  type: GET_SETTING,
  method: 'get',
  path: ({ payload }) => `/settings/${payload.id}/`
})

const doGetSettings = apiCall({
  type: GET_SETTINGS,
  method: 'get',
  path: () => `/settings/`,
})

const doCreateSetting = apiCall({
  type: CREATE_SETTING,
  method: 'post',
  path: () => `/settings/`
})

const doUpdateSetting = apiCall({
  type: UPDATE_SETTING,
  method: 'put',
  path: ({ payload }) => `/settings/${payload.id}/`
})

const doDeleteSetting = apiCall({
  type: DELETE_SETTING,
  method: 'delete',
  path: ({ payload }) => `/settings/${payload.id}`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id })
})

export default function* rootSaga () {
  yield takeLatest(GET_SETTING, doGetSetting)
  yield takeLatest(GET_SETTINGS, doGetSettings)
  yield takeLatest(CREATE_SETTING, doCreateSetting)
  yield takeLatest(UPDATE_SETTING, doUpdateSetting)
  yield takeLatest(DELETE_SETTING, doDeleteSetting)
}
