import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";

const createStoreWithMiddleware = applyMiddleware( promiseMiddleware )( createStore )

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware( reducers );
  return store;
}
