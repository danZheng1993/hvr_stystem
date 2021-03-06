import { takeLatest } from 'redux-saga/effects'
import { get, pick } from 'lodash'
import { GET_NEWS, GET_NEWSS, CREATE_NEWS, UPDATE_NEWS, DELETE_NEWS, SEARCH_NEWS }
  from '../modules/news'
import apiCall from '../api/apiCall'

const doGetNews = apiCall({
  type: GET_NEWS,
  method: 'get',
  path: ({ payload }) => `/news/${payload.id}/`
})

const dogetNewsList = apiCall({
  type: GET_NEWSS,
  method: 'get',
  path: () => `/news/?filter=${JSON.stringify({ setBanner: true })}`,
})

const doSearchNews = apiCall({
  type: SEARCH_NEWS,
  method: 'post',
  path: () => `/news/search`,
})

const doCreateNews = apiCall({
  type: CREATE_NEWS,
  method: 'post',
  path: () => `/news/`
})

const doUpdateNews = apiCall({
  type: UPDATE_NEWS,
  method: 'put',
  path: ({ payload }) => `/news/${payload.id}/`
})

const doDeleteNews = apiCall({
  type: DELETE_NEWS,
  method: 'delete',
  path: ({ payload }) => `/news/${payload.id}`,
  payloadOnSuccess: (res, { payload }) => ({ id: payload.id })
})

export default function* rootSaga () {
  yield takeLatest(GET_NEWS, doGetNews)
  yield takeLatest(GET_NEWSS, dogetNewsList)
  yield takeLatest(CREATE_NEWS, doCreateNews)
  yield takeLatest(UPDATE_NEWS, doUpdateNews)
  yield takeLatest(SEARCH_NEWS, doSearchNews)
  yield takeLatest(DELETE_NEWS, doDeleteNews)
}
