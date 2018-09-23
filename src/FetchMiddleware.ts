import Rest from './Rest';

import { ActionCallback, Action } from "./Types";
import Actions, { fetchError } from "./Actions";

const getActions = (actionsList: ActionCallback[], isLoading: boolean, data?: any) => {
    return actionsList.map(e=>{
        if (typeof e === "function"){
            return e(isLoading, data);
        }
        return e;
    }).filter(e=>e)
}

export default (store: any) => (next:any) => (action: Action) => {
    if (action.type === Actions.FETCH){
        const payload = action.payload;
        getActions(payload.actions_list, true)
            .forEach((e)=>{
                console.log(e);
                store.dispatch(e)
            })
        
        Rest.send(payload.url, payload.request)
            .then(payload.manageResponse)
            .then((data: any)=>{
                getActions(payload.actions_list, false, data)
                    .forEach(store.dispatch)
            },
            (error: any) => {
                store.dispatch(fetchError({
                    url: payload.url,
                    error: error
                }))
            }
        )
    } else {
       return next(action)
    }
}