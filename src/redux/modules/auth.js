import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail, requestPending } from '../api/request'
import { AsyncStorage } from 'react-native';
// ------------------------------------
// Constants
// ------------------------------------
export const DO_LOGIN = 'DO_LOGIN'
export const DO_LOGOUT = 'DO_LOGOUT'
export const DO_SIGNUP = 'DO_SIGNUP'
export const GET_PROFILE = 'GET_PROFILE'
export const SAVE_PROFILE = 'SAVE_PROFILE'
export const SEND_CODE = 'SEND_CODE'
export const CHECK_CODE = 'CHECK_CODE'
// ------------------------------------
// Actions
// ------------------------------------

export const login = createAction(DO_LOGIN)
export const logout = createAction(DO_LOGOUT, (callback) => {
  AsyncStorage.removeItem('hvr_auth', () => {callback}) 
})
export const signup = createAction(DO_SIGNUP)
export const checkcode = createAction(CHECK_CODE)
export const sendcode = createAction(SEND_CODE)
export const getProfile = createAction(GET_PROFILE)
export const saveProfile = createAction(SAVE_PROFILE)

const getInitialState = async () => {
  let authRestore = await AsyncStorage.getItem('hvr_auth') || null    
  console.log("authRestore", authRestore)
  return authRestore ? {
    token: JSON.parse(authRestore).token,
    me: JSON.parse(authRestore).info,
    status: 'INIT',
    error: null,
    verified: false,
    loading: false
  } : {
    token: null,
    me: null,
    status: 'INIT',
    error: null,
    verified: false,
    loading: false
  }
}
var initialState = {}
getInitialState().then(val => initialState = val)
// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [requestPending(DO_LOGIN)]: (state, { payload }) => ({
    ...state,
    status: requestPending(DO_LOGIN),
    error: null,
    loading: true,
  }),
  [requestSuccess(DO_LOGIN)]: (state, { payload }) => ({
    ...state,
    token: payload.token,
    status: requestSuccess(DO_LOGIN),
    me: payload.info,
    loading: false
  }),

  [requestFail(DO_LOGIN)]: (state, { payload }) => ({
    ...state,
    token: null,
    status: requestFail(DO_LOGIN),
    me: null,
    error: payload,
    loading: false
  }),

  [DO_LOGOUT]: (state, { payload }) => ({
    ...state,
    token: null,
    status: DO_LOGOUT,
    me: null,
    error: null,
    loading: false
  }),

  
  [requestPending(DO_SIGNUP)]: (state, { payload }) => ({
    ...state,
    status: requestPending(DO_SIGNUP),
    error: null,
    loading: true,
    
  }),

  [requestSuccess(DO_SIGNUP)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(DO_SIGNUP),
    error: null,
    loading: false,
    token: payload.token,
    me: payload.info,
  }),

  [requestFail(DO_SIGNUP)]: (state, { payload }) => ({
    ...state,
    token: null,
    status: requestFail(DO_SIGNUP),
    me: null,
    error: payload,
    loading: false
  }),

  
  [requestPending(SEND_CODE)]: (state, { payload }) => ({
    ...state,
    status: requestPending(DO_LOGIN),
    error: null,
    loading: true,
  }),

  [requestSuccess(SEND_CODE)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(SEND_CODE),
    error: null,
    loading: false
  }),

  [requestFail(SEND_CODE)]: (state, { payload }) => ({
    ...state,
    token: null,
    status: requestFail(SEND_CODE),
    me: null,
    error: payload,
    loading: false
  }),

  
  [requestPending(CHECK_CODE)]: (state, { payload }) => ({
    ...state,
    status: requestPending(DO_LOGIN),
    error: null,
    loading: true,
  }),

  [requestSuccess(CHECK_CODE)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CHECK_CODE),
    verified: payload.verified,
    error: null,
    loading: false

  }),

  [requestFail(CHECK_CODE)]: (state, { payload }) => ({
    ...state,
    token: null,
    status: requestFail(CHECK_CODE),
    me: null,
    error: payload,
    loading: false
  }),

  
  [requestPending(SAVE_PROFILE)]: (state, { payload }) => ({
    ...state,
    status: requestPending(SAVE_PROFILE),
    error: null,
    loading: true,
    
  }),

  [requestSuccess(SAVE_PROFILE)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(SAVE_PROFILE),
    me: payload,
    error: null,
    loading: false
  })

}, initialState)
