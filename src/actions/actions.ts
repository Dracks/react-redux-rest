import { ActionCallback, ResponseActionHelper, ResponseAction, ObjectDataType, ActionGenerator, Action, ResponseComposeAction } from "../Types";

const ACTIONS = {
    FETCH: "0-network",
    FETCH_ERROR: "-1-network",
}

export default ACTIONS

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

export const fetchAction : ActionGenerator = (url, callback, request =null):Action=>{
    return {
        type: ACTIONS.FETCH,
        payload: {
            url: url,
            saga: callback,
            request,
            manageResponse,
        }
    }
}

export const saveAction = (url: string, action: ActionCallback, body: ObjectDataType)=>{
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

export const deleteAction = (url: string, action: ActionCallback, body: ObjectDataType)=>{
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