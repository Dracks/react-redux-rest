import { SagaIterator } from 'redux-saga'
import { call, put } from 'redux-saga/effects';

import { Action } from '../Types'
import Rest from '../core/Rest';
import { fetchError } from '../actions/actions';


export function *fetchSaga({ payload }:Action):SagaIterator{
    yield call(payload.saga, true)
    try {
        const data = yield call(()=>{
            return Rest.send(payload.url, payload.request)
                    .then(payload.manageResponse);
        })
        yield call(payload.saga, false, data)
    } catch (error){
        //yield call(payload.saga, false, null, error)
        yield put(fetchError({
            url: payload.url,
            error
        }))
    }
}