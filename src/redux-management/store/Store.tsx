import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../reducers/authReducer";
import { calendarReducer } from "../reducers/calendarReducer";
import {uiReducer} from '../reducers/uiReducer';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer= combineReducers({
    ui:uiReducer,
    calendar: calendarReducer,
    auth: authReducer
})

//export type RootStore = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;