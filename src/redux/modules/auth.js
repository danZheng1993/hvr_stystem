import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail } from '../api/request'
import { AsyncStorage } from "react-native";
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
export const logout = createAction(DO_LOGOUT, () => {
  async () => {
    try {
        await AsyncStorage.removeItem('hvr_auth');
    } catch (error) {
        // Error saving data
    }
  }
})
export const signup = createAction(DO_SIGNUP)
export const checkcode = createAction(CHECK_CODE)
export const sendcode = createAction(SEND_CODE)
export const getProfile = createAction(GET_PROFILE)
export const saveProfile = createAction(SAVE_PROFILE)

const getInitialState = () => {
  let authRestore = JSON.parse(  null)
  return authRestore ? {
    token: authRestore.token,
    me: authRestore.info,
    status: 'INIT',
    error: null,
    verified: false,
  } : {
    token: null,
    me: null,
    status: 'INIT',
    error: null,
    verified: false
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [requestSuccess(DO_LOGIN)]: (state, { payload }) => ({
    ...state,
    token: payload.token,
    status: requestSuccess(DO_LOGIN),
    me: payload.info
  }),

  [requestFail(DO_LOGIN)]: (state, { payload }) => ({
    ...state,
    token: null,
    status: requestFail(DO_LOGIN),
    me: null,
    error: payload
  }),

  [DO_LOGOUT]: (state, { payload }) => ({
    ...state,
    token: null,
    status: DO_LOGOUT,
    me: null,
    error: null
  }),

  [requestSuccess(DO_SIGNUP)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(DO_SIGNUP),
    error: null
  }),

  [requestFail(DO_SIGNUP)]: (state, { payload }) => ({
    ...state,
    token: null,
    status: requestFail(DO_SIGNUP),
    me: null,
    error: payload
  }),
  [requestSuccess(SEND_CODE)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(SEND_CODE),
    error: null
  }),

  [requestFail(SEND_CODE)]: (state, { payload }) => ({
    ...state,
    token: null,
    status: requestFail(SEND_CODE),
    me: null,
    error: payload
  }),
  [requestSuccess(CHECK_CODE)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CHECK_CODE),
    verified: payload.verified,
    error: null
  }),

  [requestFail(CHECK_CODE)]: (state, { payload }) => ({
    ...state,
    token: null,
    status: requestFail(CHECK_CODE),
    me: null,
    error: payload
  }),

  [requestSuccess(SAVE_PROFILE)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(SAVE_PROFILE),
    me: payload,
    error: null
  })

}, getInitialState())
