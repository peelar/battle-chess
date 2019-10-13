import { arenaActions } from '../rootTypes';

export const DEFAULT_STATE = {
  arena: [],
};

const arenaState = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case arenaActions.changeArena:
      return {
        arena: [...action.payload],
      };
    default:
      return state;
  }
};

export default arenaState;
