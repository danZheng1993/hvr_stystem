import { takeLatest } from 'redux-saga/effects'
import { get, pick } from 'lodash'
import { GET_MEDIA, GET_MEDIAS, CREATE_MEDIA, UPDATE_MEDIA, DELETE_MEDIA, SEARCH_MEDIA, UPLOAD_LINK, GET_MY_MEDIAS, INCREASE_VISITS, TRASH_MEDIA }
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
})

const doGetMyMedias = apiCall({
  type: GET_MY_MEDIAS,
  method: 'get',
  path: () => `/medias/me`,
})

const doSearchMedia = apiCall({
  type: SEARCH_MEDIA,
  method: 'post',
  path: () => `/medias/search/`,
})

const doCreateMedia = apiCall({
  type: CREATE_MEDIA,
  method: 'post',
  path: () => `/medias/`
})

const doUpdateMedia = apiCall({
  type: UPDATE_MEDIA,
  method: 'put',
  path: ({ payload }) => `/medias/${payload.id}`
})

const doIncreaseVisits = apiCall({
  type: INCREASE_VISITS,
  method: 'post',
  path: ({ payload }) => `/medias/${payload.id}`
})

const doUploadLink = apiCall({
  type: UPLOAD_LINK,
  method: 'post',
  path: () => `/medias/uploadlink/`
})

const doDeleteMedia = apiCall({
  type: DELETE_MEDIA,
  method: 'delete',
  path: ({ payload }) => `/medias/${payload.id}`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id })
})

const doTrashMedia = apiCall({
  type: TRASH_MEDIA,
  method: 'delete',
  path: ({ payload }) => `/medias/trash/${payload.id}`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id })
})

export default function* rootSaga () {
  yield takeLatest(GET_MEDIA, doGetMedia)
  yield takeLatest(GET_MEDIAS, doGetMedias)
  yield takeLatest(GET_MY_MEDIAS, doGetMyMedias)
  yield takeLatest(CREATE_MEDIA, doCreateMedia)
  yield takeLatest(UPDATE_MEDIA, doUpdateMedia)
  yield takeLatest(DELETE_MEDIA, doDeleteMedia)
  yield takeLatest(TRASH_MEDIA, doTrashMedia)
  yield takeLatest(SEARCH_MEDIA, doSearchMedia)
  yield takeLatest(UPLOAD_LINK, doUploadLink)
  yield takeLatest(INCREASE_VISITS, doIncreaseVisits)
}
