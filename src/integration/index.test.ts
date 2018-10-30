import { createStore, applyMiddleware, Store, combineReducers } from 'redux'
import createSagaMiddleware, { SagaIterator } from 'redux-saga'

import fetchSaga from '../saga';
import { actions, responseActions } from '../actions';
import { ActionCallback } from '../Types';
import { call, put } from 'redux-saga/effects';
import { fetchReducer } from '..';

const RESPONSE_ACTION = "response_action"


describe("[integration tests]", ()=>{
    let store:any;

    let fetchMock = fetch as jest.Mock;

    beforeEach(()=>{
        const sagaMiddleware = createSagaMiddleware()
        const middleware = applyMiddleware(sagaMiddleware)
        fetchMock.mock.calls = [];
        store = createStore(
          ()=>(combineReducers({
              data: fetchReducer(RESPONSE_ACTION)
          })),
          middleware,
        );

        sagaMiddleware.run(fetchSaga)

    })

    it('Fetch some data request', ()=>{
        let callback:any = jest.fn()
        store.dispatch(actions.fetch("mockTest", callback))
        expect(fetchMock).toHaveBeenCalled()
        expect(fetchMock).toHaveBeenCalledWith('mockTest', {"credentials": "same-origin"})
        expect(callback).toBeCalledWith(true);
    });

    xit('Is calling the reducers', ()=>{
        let dataReceived: string=""
        let response = responseActions.normal(RESPONSE_ACTION);
        let callback: ActionCallback = function*(isLoading, data, error): SagaIterator{
            yield put(response(isLoading, data))
            console.log(isLoading, data);
            if (isLoading){
                dataReceived = data;
            }
        }
        fetchMock.mockImplementationOnce(()=>Promise.resolve("Some data!"));
        store.dispatch(actions.fetch("mockTest2", callback))
        expect(dataReceived).toBe("Some data!");
        expect(store.getState()).toEqual({})
    })
})


