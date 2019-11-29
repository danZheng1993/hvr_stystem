import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail, requestPending } from '../api/request'
import { omit, reject } from 'lodash'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_PAYMENT = 'GET_PAYMENT'
export const GET_PAYMENTS = 'GET_PAYMENTS'
export const PAY_UPFRONT = 'PAY_UPFRONT'
export const FINAL_PAY = 'FINAL_PAY'
export const SET_PAYMENTS_PAGINATION = 'SET_PAYMENTS_PAGINATION'

// ------------------------------------
// Actions
// ------------------------------------

export const getPayment = createAction(GET_PAYMENT)
export const getPayments = createAction(GET_PAYMENTS)
export const payUpfront = createAction(PAY_UPFRONT)
export const finalPay = createAction(FINAL_PAY)

const initialState = {
  payment: null,
  status: 'INIT',
  payments: [],
  loading: false,
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [requestPending(GET_PAYMENT)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_PAYMENT),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_PAYMENT)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_PAYMENT),
    payments: Object.values(payload),
    error: null,
    loading: false
  }),
  
  [requestFail(GET_PAYMENT)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_PAYMENT),
    error: payload,
    loading: false
  }),
  
  [requestPending(PAY_UPFRONT)]: (state, { payload }) => ({
    ...state,
    status: requestPending(PAY_UPFRONT),
    error: null,
    loading: true,
  }),

  [requestSuccess(PAY_UPFRONT)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(PAY_UPFRONT),
    error: null,
    loading: false
  }),
  
  [requestFail(FINAL_PAY)]: (state, { payload }) => ({
    ...state,
    status: requestFail(FINAL_PAY),
    error: payload,
    loading: false
  }),
  
  [requestPending(FINAL_PAY)]: (state, { payload }) => ({
    ...state,
    status: requestPending(FINAL_PAY),
    error: null,
    loading: true,
  }),

  [requestSuccess(FINAL_PAY)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(FINAL_PAY),
    error: null,
    loading: false
  }),
  
  [requestFail(PAY_UPFRONT)]: (state, { payload }) => ({
    ...state,
    status: requestFail(PAY_UPFRONT),
    error: payload,
    loading: false
  }),

  [requestPending(GET_PAYMENTS)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_PAYMENTS),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_PAYMENTS)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_PAYMENTS),
    payments: Object.values(payload),
    error: null,
    loading: false
  }),

  [requestFail(GET_PAYMENTS)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_PAYMENTS),
    error: payload,
    loading: false
  }),

}, initialState)
