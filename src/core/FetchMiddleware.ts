import { takeEvery, SagaIterator } from 'redux-saga'

import Rest from './Rest';
import { Action } from "../Types";
import Actions, { fetchError } from "../Actions";
import { call, put } from 'redux-saga/effects';

export default function *saga(){
    yield takeEvery(Actions.FETCH, fetchSaga)
}

function *fetchSaga({ payload }:Action):SagaIterator{
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
export const middleware = (store: any) => (next:any) => (action: Action) => {
    if (action.type === Actions.FETCH){
        const payload = action.payload;
        payload.saga(true)

        Rest.send(payload.url, payload.request)
            .then(payload.manageResponse)
            .then((data: any)=>{
                payload.saga(false, data)
            },
            (error: any) => {
                store.dispatch(fetchError({
                    url: payload.url,
                    error: error
                }))
            }
        )
    } else {
       return next(action)
    }
}