import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail, requestPending } from '../api/request'
import { omit, reject } from 'lodash'
import { refreshResult} from '../api/helpers'
// ------------------------------------
// Constants
// ------------------------------------
export const GET_INVOICE = 'GET_INVOICE'
export const GET_INVOICES = 'GET_INVOICES'
export const CREATE_INVOICE = 'CREATE_INVOICE'
export const UPDATE_INVOICE = 'UPDATE_INVOICE'
export const DELETE_INVOICE = 'DELETE_INVOICE'
export const GET_MY_INVOICE = 'GET_MY_INVOICE'
export const UPDATE_MY_INVOICELIST = 'UPDATE_MY_INVOICE_LIST'
export const SET_INVOICES_PAGINATION = 'SET_INVOICES_PAGINATION'

// ------------------------------------
// Actions
// ------------------------------------

export const getInvoice = createAction(GET_INVOICE)
export const getInvoices = createAction(GET_INVOICES)
export const createInvoice = createAction(CREATE_INVOICE)
export const updateInvoice = createAction(UPDATE_INVOICE)
export const deleteInvoice = createAction(DELETE_INVOICE)
export const getMyInvoice = createAction(GET_MY_INVOICE)
export const updateMyInvoiceList = createAction(UPDATE_MY_INVOICELIST)

const initialState = {
  invoice: null,
  status: 'INIT',
  invoices: [],
  myInvoice: [],
  loading: false,
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [requestPending(GET_INVOICE)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_INVOICE),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_INVOICE)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_INVOICE),
    invoice: payload,
    error: null,
    loading: false
  }),
  
  [requestFail(GET_INVOICE)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_INVOICE),
    error: payload,
    loading: false
  }),

  [requestPending(GET_INVOICES)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_INVOICES),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_INVOICES)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_INVOICES),
    invoices: Object.values(payload),
    error: null,
    loading: false
  }),

  [UPDATE_MY_INVOICELIST]: (state, {payload }) => ({
    ...state,
    status: UPDATE_MY_INVOICELIST,
    myInvoice: refreshResult(state.myInvoice, payload),
    error: null,
    loading: false
  }),

  [requestFail(GET_INVOICES)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_INVOICES),
    error: payload,
    loading: false
  }),

  [requestPending(GET_MY_INVOICE)]: (state, { payload }) => ({
    ...state,
    status: requestPending(GET_MY_INVOICE),
    error: null,
    loading: true,
  }),

  [requestSuccess(GET_MY_INVOICE)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(GET_MY_INVOICE),
    myInvoice: Object.values(payload),
    error: null,
    loading: false
  }),

  [requestFail(GET_MY_INVOICE)]: (state, { payload }) => ({
    ...state,
    status: requestFail(GET_MY_INVOICE),
    error: payload,
    loading: false
  }),

  [requestPending(CREATE_INVOICE)]: (state, { payload }) => ({
    ...state,
    status: requestPending(CREATE_INVOICE),
    error: null,
    loading: true,
  }),

  [requestSuccess(CREATE_INVOICE)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(CREATE_INVOICE),
    invoice: payload,
    error: null,
    loading: false
  }),

  [requestFail(CREATE_INVOICE)]: (state, { payload }) => ({
    ...state,
    status: requestFail(CREATE_INVOICE),
    error: payload,
    loading: false
  }),

  [requestPending(UPDATE_INVOICE)]: (state, { payload }) => ({
    ...state,
    status: requestPending(UPDATE_INVOICE),
    error: null,
    loading: true,
  }),

  [requestSuccess(UPDATE_INVOICE)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(UPDATE_INVOICE),
    invoice: payload,
    error: null,
    loading: false
  }),

  [requestFail(UPDATE_INVOICE)]: (state, { payload }) => ({
    ...state,
    status: requestFail(UPDATE_INVOICE),
    error: payload,
    loading: false
  }),

  [requestPending(DELETE_INVOICE)]: (state, { payload }) => ({
    ...state,
    status: requestPending(DELETE_INVOICE),
    error: null,
    loading: true,
  }),

  [requestSuccess(DELETE_INVOICE)]: (state, { payload }) => ({
    ...state,
    status: requestSuccess(DELETE_INVOICE),
    invoices: reject(state.invoices, { id: payload.id }),
    params: {
      ...state.params,
      count: Math.max(state.params.count - 1, 0),
    },
    error: null,
    loading: false
  }),

  [requestFail(DELETE_INVOICE)]: (state, { payload }) => ({
    ...state,
    status: requestFail(DELETE_INVOICE),
    error: payload,
    loading: false
  }),

}, initialState)
