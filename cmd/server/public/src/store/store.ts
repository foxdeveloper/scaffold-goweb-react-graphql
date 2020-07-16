import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootReducer}  from './reducers/root'
import { rootSaga } from './sagas/root'

let reduxMiddlewares = [];

if (process.env.NODE_ENV !== 'production') {
  const createLogger = require('redux-logger').createLogger;
  const loggerMiddleware = createLogger({
    collapsed: true,
    diff: true
  });
  reduxMiddlewares.push(loggerMiddleware);
}

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
reduxMiddlewares.push(sagaMiddleware);

// mount it on the Store
export const store = createStore(
  rootReducer,
  applyMiddleware(...reduxMiddlewares)
)

// then run the saga
sagaMiddleware.run(rootSaga);
