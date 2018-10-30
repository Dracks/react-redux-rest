import { responseActions } from "../../../src";
import FetchReducer from "../../../src/reducers/FetchReducer";

const ActionName = "Fetch data from Nasa"

export const response = responseActions.normal(ActionName)

export const reducer = FetchReducer(ActionName)