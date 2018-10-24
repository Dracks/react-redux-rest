import { ResponseAction } from "../Types";

export default <T>(actionType: string, lambda?: (e:any)=>any, extra?:(e:any)=>any) => (state=null, action: ResponseAction<T>) => {
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