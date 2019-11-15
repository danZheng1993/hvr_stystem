import { takeLatest } from 'redux-saga/effects'
import { DO_LOGIN, DO_SIGNUP, GET_PROFILE, SAVE_PROFILE, SEND_CODE, CHECK_CODE } from '../modules/auth'
import apiCall from '../api/apiCall'
import { AsyncStorage } from 'react-native';
import {storeData} from '../api/storage'

const doLogin = apiCall({
  type: DO_LOGIN,
  method: 'post',
  path: () => '/auth/login/',
  success: (res, action) => {
    AsyncStorage.setItem('hvr_auth', JSON.stringify(res.data)).then(alert("success"))
    }
})

const doSignup = apiCall({
  type: DO_SIGNUP,
  method: 'post',
  path: () => '/auth/signup/',
  success: (res, action) => {
    console.log(">>>>>>>>>signup", res)
    AsyncStorage.setItem('hvr_auth', JSON.stringify(res.data), () => {
    });
  },
})

const doSendcode = apiCall({
  type: SEND_CODE,
  method: 'post',
  path: () => '/auth/sendcode',
})

const doCheckcode = apiCall({
  type: CHECK_CODE,
  method: 'post',
  path: () => '/auth/checkcode',
})

const doGetProfile = apiCall({
  type: GET_PROFILE,
  method: 'get',
  path: () => '/profile/me/'
})

const doSaveProfile = apiCall({
  type: SAVE_PROFILE,
  method: 'patch',
  path: () => '/profile/me/',
  success: (res, action) => {
    console.log(res)
    let token
    AsyncStorage.getItem('hvr_auth').then(res => {
      token = JSON.parse(res).token
    })
    AsyncStorage.setItem('hvr_auth', JSON.stringify({
      info: res.data,
      token: token
    }), () => {

    })
  }
})

export default function* rootSaga () {
  yield takeLatest(DO_LOGIN, doLogin)
  yield takeLatest(DO_SIGNUP, doSignup)
  yield takeLatest(GET_PROFILE, doGetProfile)
  yield takeLatest(SAVE_PROFILE, doSaveProfile)
  yield takeLatest(SEND_CODE, doSendcode)
  yield takeLatest(CHECK_CODE, doCheckcode)
}
