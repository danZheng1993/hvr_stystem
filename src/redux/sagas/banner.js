import { takeLatest } from 'redux-saga/effects'
import { get, pick } from 'lodash'
import { GET_BANNER, GET_BANNERS, CREATE_BANNER, UPDATE_BANNER, DELETE_BANNER }
  from '../modules/banner'
import apiCall from '../api/apiCall'

const doGetBanner = apiCall({
  type: GET_BANNER,
  method: 'get',
  path: ({ payload }) => `/banners/${payload.id}/`
})

const doGetBanners = apiCall({
  type: GET_BANNERS,
  method: 'get',
  path: () => `/banners/`,
  payloadOnSuccess: (res, { payload }) => ({
    ...res,
    payload
  })
})

const doCreateBanner = apiCall({
  type: CREATE_BANNER,
  method: 'post',
  path: () => `/banners/`
})

const doUpdateBanner = apiCall({
  type: UPDATE_BANNER,
  method: 'put',
  path: ({ payload }) => `/banners/${payload.id}/`
})

const doDeleteBanner = apiCall({
  type: DELETE_BANNER,
  method: 'delete',
  path: ({ payload }) => `/banners/${payload.id}`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id })
})

export default function* rootSaga () {
  yield takeLatest(GET_BANNER, doGetBanner)
  yield takeLatest(GET_BANNERS, doGetBanners)
  yield takeLatest(CREATE_BANNER, doCreateBanner)
  yield takeLatest(UPDATE_BANNER, doUpdateBanner)
  yield takeLatest(DELETE_BANNER, doDeleteBanner)
}
