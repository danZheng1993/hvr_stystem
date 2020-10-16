import { takeLatest } from 'redux-saga/effects'
import AsyncStorage from '@react-native-community/async-storage';
import SyncStorage from 'sync-storage';
import { DO_LOGIN, DO_SIGNUP, GET_PROFILE, SAVE_PROFILE, SEND_CODE, CHECK_CODE, ADD_TO_CONTACTS, GET_CONTACTS, ADD_TO_COLLECTIONS, ADD_TO_ATTENTIONS, REMOVE_FROM_COLLECTIONS, REMOVE_FROM_ATTENTIONS, REGISTER_PUSHY_TOKEN, GET_EVENT_NOTIFICATIONS, GET_NORMAL_NOTIFICATIONS } from '../modules/auth'
import apiCall from '../api/apiCall'
import {saveItem, loadItem} from '../api/storage'

const doLogin = apiCall({
  type: DO_LOGIN,
  method: 'post',
  path: () => '/auth/login/',
  success: (res, action) => {
    SyncStorage.set('token', res.data.token)
    saveItem('hvr_auth', JSON.stringify(res.data)).then(() => (console.log("auth saving success!!!")))
    }
})

const doSignup = apiCall({
  type: DO_SIGNUP,
  method: 'post',
  path: () => '/auth/signup/',
  success: (res, action) => {
    SyncStorage.set('token', res.data.token)
    saveItem('hvr_auth', JSON.stringify(res.data)).then(() => (console.log("auth saving success!!!")))
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
  success: (res, action) => {
    SyncStorage.set('token', res.data.token)
    saveItem('hvr_auth', JSON.stringify(res.data)).then(() => (console.log("auth saving success!!!")))
  }
})

const doGetProfile = apiCall({
  type: GET_PROFILE,
  method: 'get',
  path: () => '/profile/me/'
})

const doGetContacts = apiCall({
  type: GET_CONTACTS,
  method: 'get',
  path: () => '/profile/contacts/'
})

const doSaveProfile = apiCall({
  type: SAVE_PROFILE,
  method: 'patch',
  path: () => '/profile/me/',
  success: (res, action) => {
    loadItem('hvr_auth')
    .then(val => {
      let token = JSON.parse(val).token
      saveItem('hvr_auth', JSON.stringify({
        info: res.data,
        token: token
      })).then(() => console.log("Profile Change Success!"))
    })
  }
})

const doAddToContacts = apiCall({
  type: ADD_TO_CONTACTS,
  method: 'patch',
  path: () => '/profile/contacts/',
  success: (res, action) => {
    console.log(res)
    loadItem('hvr_auth')
    .then(val => {
      let token = JSON.parse(val).token
      saveItem('hvr_auth', JSON.stringify({
        info: res.data,
        token: token
      })).then(() => console.log("Profile Change Success!"))
    })
  }
})

const doAddToCollections = apiCall({
  type: ADD_TO_COLLECTIONS,
  method: 'patch',
  path: () => '/profile/collections/',
  success: (res, action) => {
    console.log(res)
    loadItem('hvr_auth')
    .then(val => {
      let token = JSON.parse(val).token
      saveItem('hvr_auth', JSON.stringify({
        info: res.data,
        token: token
      })).then(() => console.log("Profile Change Success!"))
    })
  }
})

const doRemoveFromCollections = apiCall({
  type: REMOVE_FROM_COLLECTIONS,
  method: 'delete',
  path: () => '/profile/collections/',
  success: (res, action) => {
    console.log(res)
    loadItem('hvr_auth')
    .then(val => {
      let token = JSON.parse(val).token
      saveItem('hvr_auth', JSON.stringify({
        info: res.data,
        token: token
      })).then(() => console.log("Profile Change Success!"))
    })
  }
})

const doAddToAttentions = apiCall({
  type: ADD_TO_ATTENTIONS,
  method: 'patch',
  path: () => '/profile/attentions/',
  success: (res, action) => {
    console.log(res)
    loadItem('hvr_auth')
    .then(val => {
      let token = JSON.parse(val).token
      saveItem('hvr_auth', JSON.stringify({
        info: res.data,
        token: token
      })).then(() => console.log("Profile Change Success!"))
    })
  }
})

const doRemoveFromAttentions = apiCall({
  type: REMOVE_FROM_ATTENTIONS,
  method: 'delete',
  path: () => '/profile/attentions/',
  success: (res, action) => {
    console.log(res)
    loadItem('hvr_auth')
    .then(val => {
      let token = JSON.parse(val).token
      saveItem('hvr_auth', JSON.stringify({
        info: res.data,
        token: token
      })).then(() => console.log("Profile Change Success!"))
    })
  }
})

const doRegisterPushyToken = apiCall({
  type: REGISTER_PUSHY_TOKEN,
  method: 'patch',
  path: () => '/profile/me/',
  success: (res, action) => {
    loadItem('hvr_auth')
    .then(val => {
      let token = JSON.parse(val).token
      saveItem('hvr_auth', JSON.stringify({
        info: res.data,
        token: token
      })).then(() => console.log("Register Token Success"))
    })
  }
})

const doGetEventNotifications = apiCall({
  type: GET_EVENT_NOTIFICATIONS,
  method: 'get',
  path: () => '/messages/?count=0&page_size=10&filter=%7B%22type%22:%22event%22%7D'
})

const doGetNormalNotifications = apiCall({
  type: GET_NORMAL_NOTIFICATIONS,
  method: 'get',
  path: () => '/messages/?count=0&page_size=10&filter=%7B%22type%22:%22notification%22%7D'
})

export default function* rootSaga () {
  yield takeLatest(DO_LOGIN, doLogin)
  yield takeLatest(DO_SIGNUP, doSignup)
  yield takeLatest(GET_PROFILE, doGetProfile)
  yield takeLatest(SAVE_PROFILE, doSaveProfile)
  yield takeLatest(SEND_CODE, doSendcode)
  yield takeLatest(CHECK_CODE, doCheckcode)
  yield takeLatest(ADD_TO_CONTACTS, doAddToContacts)
  yield takeLatest(ADD_TO_COLLECTIONS, doAddToCollections)
  yield takeLatest(REMOVE_FROM_COLLECTIONS, doRemoveFromCollections)
  yield takeLatest(ADD_TO_ATTENTIONS, doAddToAttentions)
  yield takeLatest(REMOVE_FROM_ATTENTIONS, doRemoveFromAttentions)
  yield takeLatest(GET_CONTACTS, doGetContacts)
  yield takeLatest(REGISTER_PUSHY_TOKEN, doRegisterPushyToken)
  yield takeLatest(GET_NORMAL_NOTIFICATIONS, doGetNormalNotifications)
  yield takeLatest(GET_EVENT_NOTIFICATIONS, doGetEventNotifications)
}
