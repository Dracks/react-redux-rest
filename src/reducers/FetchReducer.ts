import { Action } from "../Types";

export default (actionType: string, lambda?: (e:any)=>any, extra?:(e:any)=>any) => (state=null, action: Action) => {
    if (action.type === actionType){
        var value = action.payload;
        if (!action.payload.reload || value.data){
            if (lambda){
                value = lambda(value);
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