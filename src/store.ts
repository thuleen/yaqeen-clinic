import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import reducer from "./reducer";
import saga from "./saga";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(saga);

export type DengueState = ReturnType<typeof store.getState>;
export type DengueDispatch = typeof store.dispatch;

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
