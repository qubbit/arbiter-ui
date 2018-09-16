import { createStore, applyMiddleware, combineReducers } from 'redux';
import { logger } from 'redux-logger';
import { reducer as reduxFormReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { reducers } from './store';

const buildRootReducer = allReducers => {
  return combineReducers({
    ...allReducers,
    form: reduxFormReducer,
    routing: routerReducer,
  });
};

export default history => {
  const store = createStore(
    buildRootReducer(reducers),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunkMiddleware, logger, routerMiddleware(history)),
  );
  return store;
};
