import { ReducerCallback, Action } from "./Types";

export default (actionType: string, reducer:ReducerCallback) => (state =[], action:Action) => {
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