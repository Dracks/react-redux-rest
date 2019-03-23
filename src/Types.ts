export type Response = {
    isLoading: boolean
    data: any
    error: any
}


export type ObjectDataType= {id?:string}

export type MetaData = {
    isLoading: boolean
    url: string
    reload?: boolean
}

export type NetworkResponse<T> = {
    meta: MetaData
    data: T
    error?: any
}

export type Action = {type: string, id?: number, payload:any}
export type ActionCall = ()=>Action
export type ReducerCallback<T> = (state:NetworkResponse<T> | undefined | null, action:Action)=>NetworkResponse<T>|null;
export type ActionCallback = (meta: MetaData, data: any, error?: any)=> Action | undefined;
export type ResponseTypesActions= string | ActionCallback
