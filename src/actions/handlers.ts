import { ResponseAction, ResponseComposeAction } from "../Types";

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