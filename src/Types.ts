export type Response = {
    isLoading: boolean
    data: any
    error: any
}


export type ObjectDataType= {id?:string}

export type Action = {type: string, id?: number, payload:any}
export type ActionCall = ()=>Action
export type ReducerCallback = <T>(state:T, action:{type:string})=>T;
export type ActionCallback = (isLoading: boolean, data: any)=> Action | undefined;
export type ResponseTypesActions= string | ActionCallback