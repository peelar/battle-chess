/* eslint-disable import/no-extraneous-dependencies */
import { createStore } from "redux";
import rootReducer from "./rootReducer";

function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
}

export default configureStore;
