import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail, requestPending } from '../api/request'
import AsyncStorage from '@react-native-community/async-storage';
import {updateUnreadMessageList, addToArray, clearUnreadMessageList} from '../api/helpers'
// ------------------------------------
// Constants
// ------------------------------------
export const DO_LOGIN = 'DO_LOGIN'
export const DO_LOGOUT = 'DO_LOGOUT'
export const DO_SIGNUP = 'DO_SIGNUP'
export const GET_PROFILE = 'GET_PROFILE'
export const SAVE_PROFILE = 'SAVE_PROFILE'
export const PUSH_NOTIFICATION = 'PUSH_NOTIFICATION'
export const PUSH_UNREAD_MESSAGES = 'PUSH_UNREAD_MESSAGES'
export const CLEAR_UNREAD_MESSAGES = 'CLEAR_UNREAD_MESSAGES'
export const GET_CONTACTS = 'GET_CONTACTS'
export const ADD_TO_CONTACTS = 'ADD_TO_CONTACTS'
export const ADD_TO_SEARCH = 'ADD_TO_SEARCH'
export const CLEAR_SEARCH = 'CLEAR_SEARCH'
export const ADD_TO_COLLECTIONS = 'ADD_TO_COLLECTIONS'
export const REMOVE_FROM_COLLECTIONS = 'REMOVE_FROM_COLLECTIONS'
export const ADD_TO_ATTENTIONS = 'ADD_TO_ATTENTIONS'
export const REMOVE_FROM_ATTENTIONS = 'REMOVE_FROM_ATTENTIONS'
export const SEND_CODE = 'SEND_CODE'
export const CHECK_CODE = 'CHECK_CODE'
export const THIRD_PARTY_SUCCESS = 'THIRD_PARTY_SUCCESS'
export const REGISTER_PUSHY_TOKEN = 'REGISTER_PUSH_TOKEN'
// ------------------------------------
// Actions
// ------------------------------------

export const login = createAction(DO_LOGIN)
export const logout = createAction(DO_LOGOUT, (callback) => {
  AsyncStorage.removeItem('hvr_auth', () => {callback}) 
})
export const signup = createAction(DO_SIGNUP)
export const thirdPartyAuthSuccess = createAction(THIRD_PARTY_SUCCESS)
export const checkcode = createAction(CHECK_CODE)
export const sendcode = createAction(SEND_CODE)
export const getProfile = createAction(GET_PROFILE)
export const saveProfile = createAction(SAVE_PROFILE)
export const getContacts = createAction(GET_CONTACTS)
export const addToContacts = createAction(ADD_TO_CONTACTS)
export const addToCollections = createAction(ADD_TO_COLLECTIONS)
export const removeFromCollections = createAction(REMOVE_FROM_COLLECTIONS)
export const addToAttentions = createAction(ADD_TO_ATTENTIONS)
export const removeFromAttentions = createAction(REMOVE_FROM_ATTENTIONS)
export const pushNotification = createAction(PUSH_NOTIFICATION)
export const pushUnreadMessages = createAction(PUSH_UNREAD_MESSAGES)
export const clearUnreadMessages = createAction(CLEAR_UNREAD_MESSAGES)
export const addToSearch = createAction(ADD_TO_SEARCH)
export const clearSearch = createAction(CLEAR_SEARCH)
export const registerPushyToken = createAction(REGISTER_PUSHY_TOKEN)

const getInitialState = async () => {
  let authRestore = await AsyncStorage.getItem('hvr_auth') || null
  return authRestore ? {
    token: JSON.parse(authRestore).token,
    me: JSON.parse(authRestore).info,
    status: 'INIT',
    error: null,
    verified: false,
    loading: false,
    contacts: [],
    unread: {},
    recentSearch: [],
    notification: []
  } : {
    token: null,
    me: null,
    status: 'INIT',
    error: null,
    verified: false,
    loading: false,
    contacts: [],
    recentSearch: [],
    unread: {},
    notification: []
  }
}

var initialState = {    token: null,
    me: null,
    status: 'INIT',
    error: null,
    verified: false,
    loading: false,
    contacts: [],
    notification: [],
    recentSearch: [],
    unread: {},}
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
    loading: false,
    unread: {},
    notification: [],
  }),

  [requestFail(DO_LOGIN)]: (state, { payload }) => ({
    ...state,
    token: null,
    status: requestFail(DO_LOGIN),
    me: null,
    error: payload,
    loading: false
  }),

  [THIRD_PARTY_SUCCESS]: (state, { payload }) => ({
    ...state,
    token: payload,
    status: THIRD_PARTY_SUCCESS,
    loading: false,
    unread: {},
    notification: [],
  }),

  [DO_LOGOUT]: (state, { payload }) => ({
    ...state,
    token: null,
    status: DO_LOGOUT,
    me: null,
    error: null,
    loading: false
  }),

  [PUSH_UNREAD_MESSAGES]: (state, { payload }) => ({
    ...state,
    status: PUSH_UNREAD_MESSAGES,
    unread: updateUnreadMessageList(state.unread, payload),
    error: null,
    loading: false
  }),

  [CLEAR_UNREAD_MESSAGES]: (state, { payload }) => ({
    ...state,
    status: CLEAR_UNREAD_MESSAGES,
    unread: clearUnreadMessageList(state.unread, payload),
    error: null,
    loading: false
  }),

  [PUSH_NOTIFICATION]: (state, { payload }) => ({
    ...state,
    status: PUSH_NOTIFICATION,
    notification: [...state.notification, payload],
    error: null,
    loading: false
  }),

  [ADD_TO_SEARCH]: (state, { payload }) => ({
    ...state,
    status: ADD_TO_SEARCH,
    recentSearch: addToArray(state.recentSearch, payload),
    error: null,
    loading: false
  }),

  [CLEAR_SEARCH]: (state, { payload }) => ({
    ...state,
    status: CLEAR_SEARCH,
    recentSearch: [],
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
    unread: {},
    notification: [],
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
    status: requestPending(SEND_CODE),
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
    status: requestPending(CHECK_CODE),
    error: null,
    loading: true,
  }),

  [requestSuccess(CHECK_CODE)]: (state, { payload }) => ({
    ...state,
    token: payload.token,
    status: requestSuccess(CHECK_CODE),
    verified: payload.verified,
    me: payload.info,
    error: null,
    loading: false,
    unread: {},
    notification: [],
  }),

  [requestFail(CHECK_CODE)]: (state, { payload }) => ({
    ...state,
    token: null,
    status: requestFail(CHECK_CODE),
    // me: null,
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
  }),

  [requestFail(SAVE_PROFILE)]: (state, { payload }) => ({
    ...state,
    status: requestFail(SAVE_PROFILE),
    error: payload,
    loading: false
  }),

  [requestPending(ADD_TO_CONTACTS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(ADD_TO_CONTACTS),
    error: null,
    loading: true,
    
  }),

  [requestSuccess(ADD_TO_CONTACTS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(ADD_TO_CONTACTS),
    me: payload,
    error: null,
    loading: false
  }),

  [requestFail(ADD_TO_CONTACTS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(ADD_TO_CONTACTS),
    error: payload,
    loading: false
  }),

  [requestPending(GET_CONTACTS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_CONTACTS),
    error: null,
    loading: true,
    
  }),

  [requestSuccess(GET_CONTACTS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_CONTACTS),
    contacts: Object.values(payload),
    error: null,
    loading: false
  }),

  [requestFail(GET_CONTACTS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_CONTACTS),
    error: payload,
    loading: false
  }),

  [requestPending(ADD_TO_COLLECTIONS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(ADD_TO_COLLECTIONS),
    error: null,
    loading: true,
    
  }),

  [requestSuccess(ADD_TO_COLLECTIONS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(ADD_TO_COLLECTIONS),
    me: payload,
    error: null,
    loading: false
  }),

  [requestFail(ADD_TO_ATTENTIONS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(ADD_TO_ATTENTIONS),
    error: payload,
    loading: false
  }),

  [requestPending(ADD_TO_ATTENTIONS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(ADD_TO_ATTENTIONS),
    error: null,
    loading: true,
    
  }),

  [requestSuccess(ADD_TO_ATTENTIONS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(ADD_TO_ATTENTIONS),
    me: payload,
    error: null,
    loading: false
  }),

  [requestFail(ADD_TO_ATTENTIONS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(ADD_TO_ATTENTIONS),
    error: payload,
    loading: false
  }),

  [requestPending(REMOVE_FROM_COLLECTIONS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(REMOVE_FROM_COLLECTIONS),
    error: null,
    loading: true,
    
  }),

  [requestSuccess(REMOVE_FROM_COLLECTIONS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(REMOVE_FROM_COLLECTIONS),
    me: payload,
    error: null,
    loading: false
  }),

  [requestFail(REMOVE_FROM_COLLECTIONS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(REMOVE_FROM_COLLECTIONS),
    error: payload,
    loading: false
  }),

  [requestPending(REMOVE_FROM_ATTENTIONS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(REMOVE_FROM_ATTENTIONS),
    error: null,
    loading: true,
    
  }),

  [requestSuccess(REMOVE_FROM_ATTENTIONS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(REMOVE_FROM_ATTENTIONS),
    me: payload,
    error: null,
    loading: false
  }),

  [requestFail(REMOVE_FROM_ATTENTIONS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(REMOVE_FROM_ATTENTIONS),
    error: payload,
    loading: false
  }),

}, initialState)
