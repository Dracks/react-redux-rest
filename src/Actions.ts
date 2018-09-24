import { ActionCallback, ActionCall, ResponseTypesActions, ObjectDataType, Action } from "./Types";

const ACTIONS = {
    FETCH: "0-network",
    FETCH_ERROR: "-1-network",
}

export default ACTIONS

type ResponseTypeCompatibility= ResponseTypesActions | ResponseTypesActions[]

export const jsonHeaders = (): HeadersInit=>{
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
}

const manageResponse = (response: Response)=> {
    if (response.ok){
        return response.json()
    } else {
        return Promise.reject({code: response.status, description: response.statusText})
    }
}

export const whenComplete = (callback:ActionCall):ActionCallback => (isLoading, data) =>{
    if (!isLoading && data){
        return callback()
    }
}

export const responseReloadAction = (action:string):ActionCallback => {
    return (isLoading, data) => {
        return {
            type: action,
            payload: {
                isLoading: isLoading,
                reload: true,
                data: data,
            }
        }
    }
}

export const responseAction = (action:string):ActionCallback=>{
    return (isLoading, data)=>{
        return {
            type: action,
            payload: {
                isLoading: isLoading, 
                data: data,
                reload: false,
            }
        }
    }
}

export const fetchAction = (url:string, action: ResponseTypeCompatibility, request: any =null)=>{
    var actions_list = action;
    if (!Array.isArray(actions_list)){
        actions_list = [(action as ResponseTypesActions)];
    }
    actions_list = actions_list.map(e=>{
        if (typeof e === "string"){
            return responseAction(e)
        } else {
            return e;
        }
    })
    
    return {
        type: ACTIONS.FETCH,
        payload: {
            url: url,
            actions_list: actions_list,
            request,
            manageResponse,
        }
    }
}

export const saveAction = (url: string, action: ResponseTypeCompatibility, body: ObjectDataType)=>{
    var method = "POST"
    if (body.id){
        url = url.replace(":id", body.id);
        method = "PUT"
    } else {
        url = url.replace(':id/','');
    }
    return fetchAction(url, action, {
        body: JSON.stringify(body),
        method: method,
        headers: jsonHeaders()
    })
}

export const deleteAction = (url: string, action: ResponseTypeCompatibility, body: ObjectDataType)=>{
    var method = "DELETE"
    url = url.replace(":id", body.id!);
    let actionObject =  fetchAction(url, action, {
        method: method,
        headers: jsonHeaders()
    });
    actionObject.payload.manageResponse = (e)=>Promise.resolve(e);
    return actionObject;
}

export const fetchError = (data: any) => {
    return {
        type: ACTIONS.FETCH_ERROR,
        payload: data
    }
}

export const compose = (action_name: string, action: ActionCallback, id?: number): ActionCallback => (isLoading, data)=>{
    return {
        type: action_name,
        payload: action(isLoading, data),
        id: id
    }
}