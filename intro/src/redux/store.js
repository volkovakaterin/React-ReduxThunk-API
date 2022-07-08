import {combineReducers, legacy_createStore} from "redux";
import serviceListReducer from "./serviceListReducer";
import serviceAddReducer from "./serviceAddReducer";
import serviceChangeReducer from "./serviceChangeReducer";

function configureStore(state) {
    return legacy_createStore(
        combineReducers({
           serviceList: serviceListReducer,
           serviceAdd: serviceAddReducer,
           serviceChange: serviceChangeReducer
         // ....
         // ....   
        })
        );
}

export default configureStore;