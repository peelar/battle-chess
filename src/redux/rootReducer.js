import { combineReducers } from 'redux';
import teamsState from './teams/reducers';
import fieldsState from './fields/reducers';
import gameState from './game/reducers';

const appReducer = combineReducers({
  teamsState,
  fieldsState,
  gameState,
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
