import { combineReducers } from 'redux';
import charactersState from './characters/reducers';
import arenaState from './arena/reducers';
import gameState from './game/reducers';

const appReducer = combineReducers({
  charactersState,
  arenaState,
  gameState,
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
