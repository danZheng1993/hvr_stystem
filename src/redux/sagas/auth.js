import { takeLatest } from 'redux-saga/effects'
import { DO_LOGIN, DO_SIGNUP, GET_PROFILE, SAVE_PROFILE, SEND_CODE, CHECK_CODE } from '../modules/auth'
import apiCall from '../api/apiCall'
import { AsyncStorage } from "react-native";

const doLogin = apiCall({
  type: DO_LOGIN,
  method: 'post',
  path: () => '/auth/login/',
  success: (res, action) => {
    console.log("aaa",res.data)
    AsyncStorage.setItem('hvr_auth', JSON.stringify(res.data), () => {
      AsyncStorage.getItem('hvr_auth').then( res => {
        console.log(JSON.parse(res))
      })
    });
  }
})

const doSignup = apiCall({
  type: DO_SIGNUP,
  method: 'post',
  path: () => '/auth/signup/',
  success: () => {
    AsyncStorage.removeItem('hvr_auth', () => {

    })
  },
  fail: () => {
    AsyncStorage.removeItem('hvr_auth', () => {

    })
  }
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
  path: () => '/users/profile/'
})

const doSaveProfile = apiCall({
  type: SAVE_PROFILE,
  method: 'put',
  path: () => '/users/profile/',
  success: (res, action) => {
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
