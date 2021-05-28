import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "../reducers";
import promise from "redux-promise"; //Redux promise middleware enables robust handling of async code in Redux

const composePlugin =
  (window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()) ||
  compose;

let createStoreWithMiddleware;
if (process.env.NODE_ENV === "development") {
  createStoreWithMiddleware = createStoreWithMiddleware = applyMiddleware(
    promise,
    thunk,
    logger
  )(createStore);
} else {
  createStoreWithMiddleware = createStoreWithMiddleware = applyMiddleware(
    promise,
    thunk
  )(createStore);
}
const store = createStoreWithMiddleware(rootReducer, composePlugin);

export default store;
