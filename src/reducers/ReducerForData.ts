import { ReducerCallback,  ResponseComposeAction } from "../Types";

export default <T>(actionType: string, reducer:ReducerCallback) => (state =[], action:ResponseComposeAction<T>) => {
    if (actionType === action.type) {
        let id = action.id!
        let subState : any[] = state[id]
        let newState = reducer(subState, action.payload)
        if (newState !== subState){
            let r : any[] = [...state]
            r[id] = newState
            return r;
        }
    }
    return state;
}