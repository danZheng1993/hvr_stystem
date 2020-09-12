import axios from 'axios'
import { call, put } from 'redux-saga/effects'
import { get } from 'lodash'
import { requestFail, requestPending, requestSuccess } from './request'
import SyncStorage from 'sync-storage';
import constants from '../../constants'
const defaultHeaders = () => {
  const token = SyncStorage.get('token') || null;
  //axios.defaults.baseURL = process.env.API_ROOT + '/'
  axios.defaults.baseURL = constants.BASE_URL
  var headers = {
    'Accept': '*/*',
    'Content-Type': 'application/json'
  }

  if (token) {
    headers['Authorization'] = 'Bearer ' + token
  } 
  return headers;
}
export default ({
  type,
  method, // one of 'get', 'post', 'put', 'delete'
  path,
  headers,
  success,
  fail,
  payloadOnSuccess,
  payloadOnFail
}) => function* (action) {
  const {
    body,
    file,
    params,
    success: successCallback,
    fail: failCallback
  } = (action.payload || {})

  try {
    yield put({
      type: requestPending(type),
      loading: true
    })

    const res = yield call(axios.request, {
      url: typeof path === 'function' ? path(action) : path,
      method: method.toLowerCase(),
      headers: Object.assign({}, defaultHeaders(), headers),
      data: body,
      params
    })

    successCallback && successCallback(res)
    success && success(res, action)

    yield put({
      type: requestSuccess(type),
      payload: payloadOnSuccess ? payloadOnSuccess(res.data, action) : res.data
    })
  } catch (err) {
    const errRes = get(err, 'response', err)
    console.log({ errRes });

    failCallback && failCallback(errRes)
    fail && fail(errRes)

    yield put({
      type: requestFail(type),
      payload: payloadOnFail ? payloadOnFail(errRes, action) : errRes
    })
  }
}

export const postApi = (url, data) =>
  axios.request({
    url,
    method: 'POST',
    headers: defaultHeaders(),
    data,
  });

export const getApi = (url, data) =>
  axios.request({
    url,
    method: 'GET',
    headers: defaultHeaders(),
  });

export const updateApi = (url, data) =>
  axios.request({
    url,
    method: 'PUT',
    headers: defaultHeaders(),
    data,
  });