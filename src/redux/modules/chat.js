import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail, requestPending } from '../api/request'
import { omit, reject } from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_CHAT = 'GET_CHAT'
export const GET_CHATS = 'GET_CHATS'
export const CREATE_CHAT = 'CREATE_CHAT'
export const UPDATE_CHAT = 'UPDATE_CHAT'
export const DELETE_CHAT = 'DELETE_CHAT'
export const SET_CHATS_PAGINATION = 'SET_CHATS_PAGINATION'

// ------------------------------------
// Actions
// ------------------------------------

export const getChat = createAction(GET_CHAT)
export const getChats = createAction(GET_CHATS)
export const createChat = createAction(CREATE_CHAT)
export const updateChat = createAction(UPDATE_CHAT)
export const deleteChat = createAction(DELETE_CHAT)

const initialState = {
  chat: null,
  status: 'INIT',
  chats: [],
  loading: false,
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [requestPending(GET_CHAT)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_CHAT),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_CHAT)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_CHAT),
    chats: Object.values(payload),
    error: null,
    loading: false
  }),
  
  [requestFail(GET_CHAT)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_CHAT),
    error: payload,
    loading: false
  }),

  [requestPending(GET_CHATS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_CHATS),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_CHATS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_CHATS),
    chats: Object.values(payload),
    error: null,
    loading: false
  }),

  [requestFail(GET_CHATS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_CHATS),
    error: payload,
    loading: false
  }),

  [requestPending(CREATE_CHAT)]: (state, { payload }) => ({
    ...state,
    status: requestPending(CREATE_CHAT),
    error: null,
    loading: true,
  }),

  [requestSuccess(CREATE_CHAT)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CREATE_CHAT),
    chat: payload,
    error: null,
    loading: false
  }),

  [requestFail(CREATE_CHAT)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CREATE_CHAT),
    error: payload,
    loading: false
  }),

  [requestPending(UPDATE_CHAT)]: (state, { payload }) => ({
    ...state,
    status: requestPending(UPDATE_CHAT),
    error: null,
    loading: true,
  }),

  [requestSuccess(UPDATE_CHAT)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(UPDATE_CHAT),
    chat: payload,
    error: null,
    loading: false
  }),

  [requestFail(UPDATE_CHAT)]: (state, { payload }) => ({
    ...state,
    status: requestFail(UPDATE_CHAT),
    error: payload,
    loading: false
  }),

  [requestPending(DELETE_CHAT)]: (state, { payload }) => ({
    ...state,
    status: requestPending(DELETE_CHAT),
    error: null,
    loading: true,
  }),

  [requestSuccess(DELETE_CHAT)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(DELETE_CHAT),
    chats: reject(state.chats, { id: payload.id }),
    params: {
      ...state.params,
      count: Math.max(state.params.count - 1, 0),
    },
    error: null,
    loading: false
  }),

  [requestFail(DELETE_CHAT)]: (state, { payload }) => ({
    ...state,
    status: requestFail(DELETE_CHAT),
    error: payload,
    loading: false
  }),

}, initialState)
