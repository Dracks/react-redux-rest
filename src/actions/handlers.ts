import { put } from "redux-saga/effects";
import { ResponseAction, ResponseComposeAction, ResponseActionHelper } from "../Types";

export const whenComplete = (callback:any) => (isLoading:boolean, data:any) => {
    if (!isLoading && data){
        return callback
    }
}

export const compose = <T>(action_name: string, id: number) => (subAction: ResponseAction<T> | ResponseComposeAction<T>): ResponseComposeAction<T>=>({
    type: action_name,
    id,
    payload: subAction

})

export const saga =  (responseHandler: ResponseActionHelper<any>)=> {
    return function* s(isLoading:boolean, data:any){
        yield put(responseHandler(isLoading, data))
    }
}