import axios from 'axios'
import { call, put } from 'redux-saga/effects'
import { get } from 'lodash'
import { requestFail, requestPending, requestSuccess } from './request'
import { AsyncStorage } from 'react-native'
var defaultHeader
defaultHeaders = async () => {
  var auth = await AsyncStorage.getItem('hvr_auth') || null;
  console.log("auth",auth)
  //axios.defaults.baseURL = process.env.API_ROOT + '/'
  axios.defaults.baseURL = 'http://198.18.16.228:4000/'
  var headers = {
    'Accept': '*/*',
    'Content-Type': 'application/json'
  }

  if (auth) {
    const token = JSON.parse(auth).token
    headers['Authorization'] = 'Bearer ' + token
    console.log('token', token)
  } 
  return headers;
}
defaultHeaders().then((header => defaultHeader = header))
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
    console.log({
      url: typeof path === 'function' ? path(action) : path,
      method: method.toLowerCase(),
      headers: Object.assign({}, defaultHeader),
      data: body,
      params
    })
    yield put({
      type: requestPending(type),
      loading: true
    })

    const res = yield call(axios.request, {
      url: typeof path === 'function' ? path(action) : path,
      method: method.toLowerCase(),
      headers: Object.assign({}, defaultHeader, headers),
      data: body,
      params: body
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
