export type Response = {
    isLoading: boolean
    data: any
    error: any
}


export type ObjectDataType= {id?:string}

export type NetworkResponse<T> = {
    isLoading: boolean
    data: T
    reload?: boolean
    error?: any
}

export type Action = {type: string, id?: number, payload:any}
export type ActionCall = ()=>Action
export type ReducerCallback<T> = (state:NetworkResponse<T> | undefined | null, action:Action)=>NetworkResponse<T>|null;
export type ActionCallback = (isLoading: boolean, data: any)=> Action | undefined;
export type ResponseTypesActions= string | ActionCallback
