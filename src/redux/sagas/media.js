import { takeLatest } from 'redux-saga/effects'
import { get, pick } from 'lodash'
import { GET_MEDIA, GET_MEDIAS, CREATE_MEDIA, UPDATE_MEDIA, DELETE_MEDIA }
  from '../modules/media'
import apiCall from '../api/apiCall'

const doGetMedia = apiCall({
  type: GET_MEDIA,
  method: 'get',
  path: ({ payload }) => `/medias/${payload.id}/`
})

const doGetMedias = apiCall({
  type: GET_MEDIAS,
  method: 'get',
  path: () => `/medias/`,
  payloadOnSuccess: (res, { payload }) => ({
    ...res,
    payload
  })
})

const doCreateMedia = apiCall({
  type: CREATE_MEDIA,
  method: 'post',
  path: () => `/medias/`
})

const doUpdateMedia = apiCall({
  type: UPDATE_MEDIA,
  method: 'put',
  path: ({ payload }) => `/medias/${payload.id}/`
})

const doDeleteMedia = apiCall({
  type: DELETE_MEDIA,
  method: 'delete',
  path: ({ payload }) => `/medias/${payload.id}`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id })
})

export default function* rootSaga () {
  yield takeLatest(GET_MEDIA, doGetMedia)
  yield takeLatest(GET_MEDIAS, doGetMedias)
  yield takeLatest(CREATE_MEDIA, doCreateMedia)
  yield takeLatest(UPDATE_MEDIA, doUpdateMedia)
  yield takeLatest(DELETE_MEDIA, doDeleteMedia)
}
