import { takeLatest } from 'redux-saga/effects'
import { get, pick } from 'lodash'
import { GET_SCENE, GET_SCENES, CREATE_SCENE, UPDATE_SCENE, DELETE_SCENE }
  from '../modules/scene'
import apiCall from '../api/apiCall'

const doGetScene = apiCall({
  type: GET_SCENE,
  method: 'get',
  path: ({ payload }) => `/scenes/${payload.id}/`
})

const doGetScenes = apiCall({
  type: GET_SCENES,
  method: 'get',
  path: () => `/scenes/`,
  payloadOnSuccess: (res, { payload }) => ({
    ...res,
    payload
  })
})

const doCreateScene = apiCall({
  type: CREATE_SCENE,
  method: 'post',
  path: () => `/scenes/`
})

const doUpdateScene = apiCall({
  type: UPDATE_SCENE,
  method: 'put',
  path: ({ payload }) => `/scenes/${payload.id}/`
})

const doDeleteScene = apiCall({
  type: DELETE_SCENE,
  method: 'delete',
  path: ({ payload }) => `/scenes/${payload.id}`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id })
})

export default function* rootSaga () {
  yield takeLatest(GET_SCENE, doGetScene)
  yield takeLatest(GET_SCENES, doGetScenes)
  yield takeLatest(CREATE_SCENE, doCreateScene)
  yield takeLatest(UPDATE_SCENE, doUpdateScene)
  yield takeLatest(DELETE_SCENE, doDeleteScene)
}
