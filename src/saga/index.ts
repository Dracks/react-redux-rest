import { takeEvery } from 'redux-saga'
import { fetchSaga } from './fetchSaga';
import Actions from '../actions/actions';

export default function *saga(){
    yield takeEvery(Actions.FETCH, fetchSaga)
}