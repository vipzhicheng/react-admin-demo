import { takeLatest, put, call } from 'redux-saga/effects'
import dataProvider from '../Providers/DataProvider'
import {
  GET_OPTIONS,
  FETCH_OPTIONS_SUCCESS,
  FETCH_OPTIONS_REQUEST
} from '../Actions/Options'

export function* fetchOptions() {
  const res = yield call(dataProvider, GET_OPTIONS, 'options')
  yield put({ type: FETCH_OPTIONS_SUCCESS, data: res.data })
}

export function* watchFetchOptions() {
  yield takeLatest(FETCH_OPTIONS_REQUEST, fetchOptions)
}
