import { SagaIterator } from 'redux-saga';

export type Response = {
    isLoading: boolean
    data: any
    error: any
}


export type ObjectDataType= {id?:string}

export type ActionCallback = (isLoading: boolean, data?: any, error?:any)=> SagaIterator ;
export type ActionGenerator = (url:string, callback: ActionCallback, request?:any) => Action
export type Action = {
    type: string,
    id?: number,
    payload: {
        url: string,
        request: any,
        saga: ActionCallback,
        manageResponse: (a:any)=>any
    }
}
export type ActionCall = ()=>Action
export type ReducerCallback = <T>(state:T, action:{type:string})=>T;
export type ResponseTypesActions= string | ActionCallback
export type ResponseAction<T> = {
    type: string,
    id?: number,
    payload: {
        isLoading: boolean,
        reload?: boolean,
        data: T | ResponseAction<T>
    }
}
export type ResponseComposeAction<T> = {
    type: string,
    id: number,
    payload: ResponseAction<T> | ResponseComposeAction<T>
}
export type ResponseActionHelper<T> = (isLoading:boolean, data:T, error?:any) => ResponseAction<T>