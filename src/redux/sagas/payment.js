import { takeLatest } from 'redux-saga/effects'
import { get, pick } from 'lodash'
import { GET_PAYMENT, GET_PAYMENTS, PAY_UPFRONT, FINAL_PAY, MAKE_PAYMENT, SEND_PAYMENT_TO_USER }
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

const doFinalPay = apiCall({
  type: FINAL_PAY,
  method: 'post',
  path: () => `/payments/finalPay`,
})

const doMakePayment = apiCall({
	type: MAKE_PAYMENT,
	method: 'post',
	path: () => '/payments/payForProject',
})

const doSendPaymentToUser = apiCall({
	type: SEND_PAYMENT_TO_USER,
	method: 'post',
	path: () => 'payments/sendPaymentToUser',
})

export default function* rootSaga () {
  yield takeLatest(GET_PAYMENT, doGetPayment)
  yield takeLatest(GET_PAYMENTS, doGetPayments)
  yield takeLatest(PAY_UPFRONT, doPayUpfront)
	yield takeLatest(FINAL_PAY, doFinalPay)
	yield takeLatest(MAKE_PAYMENT, doMakePayment)
	yield takeLatest(SEND_PAYMENT_TO_USER, doSendPaymentToUser)
}
