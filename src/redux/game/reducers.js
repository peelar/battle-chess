import uuid4 from 'uuid';
import { gameActions } from '../rootTypes';

export const DEFAULT_STATE = {
  round: 0,
  activeTeam: 0,
  events: [],
};

const gameState = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case gameActions.incrementRound:
      return {
        ...state,
        round: state.round + 1,
      };
    case gameActions.changeActiveTeam:
      return {
        ...state,
        activeTeam: state.activeTeam === 0 ? 1 : 0,
      };
    case gameActions.createEvent:
      return {
        ...state,
        events: [...state.events, { id: uuid4(), ...action.payload }],
      };

    default:
      return state;
  }
};

export default gameState;
