import { combineReducers } from 'redux';
import fieldsState from './fields/reducers';
import charactersState from './characters/reducers';
import arenaState from './arena/reducers';

const appReducer = combineReducers({
  fieldsState,
  charactersState,
  arenaState,
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
