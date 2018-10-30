import Rest from './Rest';
import { Action } from "../Types";
import Actions, { fetchError } from "../actions/actions";


export const fetchMiddleware = (store: any) => (next:any) => (action: Action) => {
    if (action.type === Actions.FETCH){
        const payload = action.payload;
        payload.saga(true)

        Rest.send(payload.url, payload.request)
            .then(payload.manageResponse)
            .then((data: any)=>{
                payload.saga(false, data)
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