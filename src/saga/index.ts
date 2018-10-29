import { takeEvery } from 'redux-saga'
import { fetchSaga } from './fetchSaga';
import Actions from '../Actions';

export default function *saga(){
    yield takeEvery(Actions.FETCH, fetchSaga)
}