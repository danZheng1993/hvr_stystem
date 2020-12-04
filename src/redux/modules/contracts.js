import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail, requestPending } from '../api/request'
import { omit, reject } from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_CONTRACTS = 'GET_CONTRACTS'

// ------------------------------------
// Actions
// ------------------------------------

export const getContracts = createAction(GET_CONTRACTS)

const initialState = {
  contracts: [],
  loading: false,
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({

  [requestPending(GET_CONTRACTS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_CONTRACTS),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_CONTRACTS)]: (state, { payload }) => {
    return {
      ...state,
      status: requestSuccess(GET_CONTRACTS),
      contracts: payload.contracts,
      error: null,
      loading: false
    };
  },

  [requestFail(GET_CONTRACTS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_CONTRACTS),
    error: payload,
    loading: false
  }),

}, initialState)
