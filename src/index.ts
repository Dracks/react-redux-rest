import fetchReducer from './reducers/FetchReducer';
import { fetchMiddleware } from './core/FetchMiddleware';
import fetchSaga from './saga';
import reducerForData from './reducers/ReducerForData';

export * from './Actions';

export {
    fetchMiddleware,
    fetchReducer,
    reducerForData,
    fetchSaga
}