import {createStore, applyMiddleware, compose} from "redux";
import thunkMiddleware from "redux-thunk";

import reducers from "reducers";
import WSActions from "actions/ws";


export default function configureStore(initialState) {
    const store = createStore(
        reducers,
        initialState,
        applyMiddleware(thunkMiddleware)
    );
    if (typeof window !== "undefined") {
        store.dispatch(WSActions.socket_connect());
        store.dispatch(WSActions.channel_join("visitors"));
        store.dispatch(WSActions.channel_join("schedule"));
    }
    return store;
}