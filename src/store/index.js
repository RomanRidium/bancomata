import {applyMiddleware, combineReducers, createStore} from "redux";
import authReducer from "./authReducer/authReducer";
import '../firebase/firebase'
import {thunk} from "redux-thunk";
import totalReducer from "./totalReducer/totalReducer";
import totalAccReducer from "./totalAccReducer/totalAccReducer";
import logsReducer from "./logsReducer/logsReducer";


const rootReducer = combineReducers({
    total: totalReducer,
    auth: authReducer,
    totalAcc: totalAccReducer,
    logs: logsReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
