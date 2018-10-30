import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, combineReducers, compose } from  'redux';

import { fetchSaga } from '../../src';
import App from './app';
import { reducer } from './app/Actions';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (config:any)=><R>(a: R) => R
    }
  }

const reducersList = combineReducers({
    rest: reducer
})
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers : <R>(a: R) => R =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const store = createStore(reducersList, {}, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(fetchSaga);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));