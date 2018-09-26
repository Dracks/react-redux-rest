import fetchReducer from './reducers/FetchReducer';
import fetchMiddleware from './core/FetchMiddleware';
import withLoading from './hoc/LoadingHoc';
import reducerForData from './reducers/ReducerForData';
import MultiPropsLoadingHOC from './hoc/MultiPropsLoadingHOC';

export * from './Actions';
export { extractData } from './hoc/LoadingHoc';

export {
    fetchMiddleware,
    fetchReducer,
    withLoading,
    MultiPropsLoadingHOC,
    reducerForData,
}