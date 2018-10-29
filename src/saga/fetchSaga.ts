import { SagaIterator } from 'redux-saga'
import { call, put } from 'redux-saga/effects';

import { Action } from '../Types'
import Rest from '../core/Rest';
import { fetchError } from '..';


export function *fetchSaga({ payload }:Action):SagaIterator{
    yield call(payload.saga, true)
    try {
        const response = yield call(Rest.send, payload.url, payload.request)
        console.log(response);
        const data = payload.manageResponse(response)
        yield call(payload.saga, false, data)
    } catch (error){
        yield put(fetchError({
            url: payload.url,
            error
        }))
    }
}