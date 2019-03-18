import { Action, ReducerCallback, NetworkResponse } from "../Types";

const fetchReducer = <T, E>(actionType: string, lambda?: (e:NetworkResponse<T>, v?:NetworkResponse<E> | null)=>NetworkResponse<E>, extra?:(e:any)=>any): ReducerCallback<E> => (state=null, action: Action) => {
    if (action.type === actionType){
        var value = action.payload;
        if (!action.payload.reload || value.data){
            if (lambda){
                value = lambda(value, state);
            }
            let r = Object.assign({}, state, value);
            return r;
        }
    }
    if (extra){
        return extra(state);
    }
    return state;
}

export default fetchReducer