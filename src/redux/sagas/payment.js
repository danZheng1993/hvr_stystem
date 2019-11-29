import { takeLatest } from 'redux-saga/effects'
import { get, pick } from 'lodash'
import { GET_PAYMENT, GET_PAYMENTS, PAY_UPFRONT }
  from '../modules/payment'
import apiCall from '../api/apiCall'

const doGetPayment = apiCall({
  type: GET_PAYMENT,
  method: 'get',
  path: ({ payload }) => `/payments/${payload.params.to}/`
})

const doGetPayments = apiCall({
  type: GET_PAYMENTS,
  method: 'get',
  path: () => `/payments/`,
})

const doPayUpfront = apiCall({
  type: PAY_UPFRONT,
  method: 'post',
  path: () => `/payments/payUpfront`,
})

export default function* rootSaga () {
  yield takeLatest(GET_PAYMENT, doGetPayment)
  yield takeLatest(GET_PAYMENTS, doGetPayments)
  yield takeLatest(PAY_UPFRONT, doPayUpfront)
}
