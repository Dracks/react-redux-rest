import { responseAction, handlers } from "../../../src";
import FetchReducer from "../../../src/reducers/FetchReducer";

const ActionName = "Fetch data from Nasa"

export const response = responseAction(ActionName)

export const callback = handlers.saga(response);

export const reducer = FetchReducer(ActionName)