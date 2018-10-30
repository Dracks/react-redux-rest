import { ResponseActionHelper } from "../Types";

/**
 * Do not override until the loading was completed
 * @param action The action to launch
 */
export const responseReloadAction = (action:string):ResponseActionHelper<any> => {
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
/**
 * It will override the information. With new loading information
 * @param action The action type to launch
 */
export const responseAction = (action:string):ResponseActionHelper<any>=>{
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