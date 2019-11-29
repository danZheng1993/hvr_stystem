import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail, requestPending } from '../api/request'
import { omit, reject } from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_MEDIA = 'GET_MEDIA'
export const GET_MEDIAS = 'GET_MEDIAS'
export const CREATE_MEDIA = 'CREATE_MEDIA'
export const UPDATE_MEDIA = 'UPDATE_MEDIA'
export const DELETE_MEDIA = 'DELETE_MEDIA'
export const SEARCH_MEDIA = 'SEARCH_MEDIA'
export const UPLOAD_LINK = 'UPLOAD_LINK'
export const REMOVE_COLLECTION = 'REMOVE_COLLECTION'
export const SET_MEDIAS_PAGINATION = 'SET_MEDIAS_PAGINATION'

// ------------------------------------
// Actions
// ------------------------------------

export const getMedia = createAction(GET_MEDIA)
export const getMedias = createAction(GET_MEDIAS)
export const createMedia = createAction(CREATE_MEDIA)
export const updateMedia = createAction(UPDATE_MEDIA)
export const deleteMedia = createAction(DELETE_MEDIA)
export const searchMedia = createAction(SEARCH_MEDIA)
export const uploadLink = createAction(UPLOAD_LINK)
export const removeCollection = createAction(REMOVE_COLLECTION)

const initialState = {
  media: null,
  status: 'INIT',
  medias: [],
  searchResult: [],
  loading: false,
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [requestPending(GET_MEDIA)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_MEDIA),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_MEDIA)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_MEDIA),
    media: payload,
    error: null,
    loading: false
  }),
  
  [requestFail(GET_MEDIA)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_MEDIA),
    error: payload,
    loading: false
  }),

  [requestPending(GET_MEDIAS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_MEDIAS),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_MEDIAS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_MEDIAS),
    medias: Object.values(payload),
    error: null,
    loading: false
  }),

  [requestFail(GET_MEDIAS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_MEDIAS),
    error: payload,
    loading: false
  }),

  [requestPending(SEARCH_MEDIA)]: (state, { payload }) => ({
    ...state,
    status: requestPending(SEARCH_MEDIA),
    error: null,
    loading: true,
  }),

  [requestSuccess(SEARCH_MEDIA)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(SEARCH_MEDIA),
    searchResult: Object.values(payload),
    error: null,
    loading: false
  }),

  [requestFail(SEARCH_MEDIA)]: (state, { payload }) => ({
    ...state,
    status: requestFail(SEARCH_MEDIA),
    error: payload,
    loading: false
  }),

  [REMOVE_COLLECTION]: (state, { payload }) => ({
    ...state,
    status: REMOVE_COLLECTION,
    searchResult: reject(state.searchResult, { _id: payload.id }),
    error: null,
    loading: false
  }),

  [requestPending(CREATE_MEDIA)]: (state, { payload }) => ({
    ...state,
    status: requestPending(CREATE_MEDIA),
    error: null,
    loading: true,
  }),

  [requestSuccess(CREATE_MEDIA)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CREATE_MEDIA),
    media: payload,
    error: null,
    loading: false
  }),

  [requestFail(CREATE_MEDIA)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CREATE_MEDIA),
    error: payload,
    loading: false
  }),

  [requestPending(UPDATE_MEDIA)]: (state, { payload }) => ({
    ...state,
    status: requestPending(UPDATE_MEDIA),
    error: null,
    loading: true,
  }),

  [requestSuccess(UPDATE_MEDIA)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(UPDATE_MEDIA),
    media: payload,
    error: null,
    loading: false
  }),

  [requestFail(UPDATE_MEDIA)]: (state, { payload }) => ({
    ...state,
    status: requestFail(UPDATE_MEDIA),
    error: payload,
    loading: false
  }),

  [requestPending(UPLOAD_LINK)]: (state, { payload }) => ({
    ...state,
    status: requestPending(UPLOAD_LINK),
    error: null,
    loading: true,
  }),

  [requestSuccess(UPLOAD_LINK)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(UPLOAD_LINK),
    media: payload,
    error: null,
    loading: false
  }),

  [requestFail(UPLOAD_LINK)]: (state, { payload }) => ({
    ...state,
    status: requestFail(UPLOAD_LINK),
    error: payload,
    loading: false
  }),

  [requestPending(DELETE_MEDIA)]: (state, { payload }) => ({
    ...state,
    status: requestPending(DELETE_MEDIA),
    error: null,
    loading: true,
  }),

  [requestSuccess(DELETE_MEDIA)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(DELETE_MEDIA),
    medias: reject(state.medias, { id: payload.id }),
    params: {
      ...state.params,
      count: Math.max(state.params.count - 1, 0),
    },
    error: null,
    loading: false
  }),

  [requestFail(DELETE_MEDIA)]: (state, { payload }) => ({
    ...state,
    status: requestFail(DELETE_MEDIA),
    error: payload,
    loading: false
  }),

}, initialState)
