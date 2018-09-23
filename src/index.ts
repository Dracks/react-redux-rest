import fetchReducer from './FetchReducer';
import fetchMiddleware from './FetchMiddleware';
import withLoading from './LoadingHoc';
import reducerForData from './ReducerForData';
import MultiPropsLoadingHOC from './MultiPropsLoadingHOC';

export * from './Actions';
export { extractData } from './LoadingHoc';

export {
    fetchMiddleware,
    fetchReducer,
    withLoading,
    MultiPropsLoadingHOC,
    reducerForData,
}