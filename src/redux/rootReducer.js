import { combineReducers } from 'redux';
import teamsState from './teams/reducers';
import arenaState from './arena/reducers';
import gameState from './game/reducers';

const appReducer = combineReducers({
  teamsState,
  arenaState,
  gameState,
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
