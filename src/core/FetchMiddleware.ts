import Rest from './Rest';

import { ActionCallback, Action, MetaData } from "../Types";
import Actions, { fetchError } from "../Actions";

const getActions = (actionsList: ActionCallback[], meta: MetaData, data?: any, error?: any) => {
    return actionsList.map(e=>{
        if (typeof e === "function"){
            return e(meta, data, error);
        }
        return e;
    }).filter(e=>e)
}

export default (store: any) => (next:any) => (action: Action) => {
    if (action.type === Actions.FETCH){
        const payload = action.payload;
        const getMeta = (isLoading: boolean): MetaData=>({
            url: payload.url,
            isLoading
        })
        getActions(payload.actions_list, getMeta(true))
            .forEach((e)=>{
                store.dispatch(e)
            })

        Rest.send(payload.url, payload.request)
            .then(payload.manageResponse)
            .then((data: any)=>{
                getActions(payload.actions_list, getMeta(false), data)
                    .forEach(store.dispatch)
            },
            (error: any) => {
                store.dispatch(fetchError({
                    url: payload.url,
                    error: error
                }))
                getActions(payload.actions_list, getMeta(false), null, error)
                    .forEach(store.dispatch)
            }
        )
    } else {
       return next(action)
    }
}