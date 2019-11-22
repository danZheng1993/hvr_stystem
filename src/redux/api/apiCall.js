import axios from 'axios'
import { call, put } from 'redux-saga/effects'
import { get } from 'lodash'
import { requestFail, requestPending, requestSuccess } from './request'
import { AsyncStorage } from 'react-native'
import SyncStorage from 'sync-storage';
const defaultHeaders = () => {
  const token = SyncStorage.get('token') || null;
  //axios.defaults.baseURL = process.env.API_ROOT + '/'
  axios.defaults.baseURL = 'http://192.168.31.207:4000/'
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

    failCallback && failCallback(errRes)
    fail && fail(errRes)

    yield put({
      type: requestFail(type),
      payload: payloadOnFail ? payloadOnFail(errRes, action) : errRes
    })
  }
}
