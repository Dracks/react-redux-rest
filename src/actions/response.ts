import { ResponseActionHelper } from "../Types";

/**
 * It will override the information. With new loading information
 * @param action The action type to launch
 * @param notDeleteOnReload a parameter to know if in reload should remove data or not
 */
export const responseAction = (action:string, notDeleteOnReload: boolean=false):ResponseActionHelper<any>=>{
    return (isLoading, data)=>{
        return {
            type: action,
            payload: {
                isLoading: isLoading,
                data: data,
                reload: notDeleteOnReload,
            }
        }
    }
}