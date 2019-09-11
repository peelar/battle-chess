import { combineReducers } from 'redux';
import fieldsState from './fields/reducers';
import charactersState from './characters/reducers';

const appReducer = combineReducers({
  fieldsState,
  charactersState,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
