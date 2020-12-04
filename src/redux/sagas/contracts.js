import { takeLatest } from 'redux-saga/effects'
import { get, pick } from 'lodash'
import { GET_CONTRACTS }
  from '../modules/contracts'
import apiCall from '../api/apiCall'


const doGetContracts = apiCall({
  type: GET_CONTRACTS,
  method: 'get',
  path: () => `/contracts/`,
})

export default function* rootSaga () {
  yield takeLatest(GET_CONTRACTS, doGetContracts)
}
