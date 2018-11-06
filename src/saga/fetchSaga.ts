import { SagaIterator } from 'redux-saga'
import { call } from 'redux-saga/effects';

import { Action } from '../Types'
import Rest from '../core/Rest';


export function *fetchSaga({ payload }:Action):SagaIterator{
    yield call(payload.saga, true)
    try {
        const data = yield call(()=>{
            return Rest.send(payload.url, payload.request)
                    .then(payload.manageResponse);
        })
        yield call(payload.saga, false, data)
    } catch (error){
        yield call(payload.saga, false, null, error)
    }
}