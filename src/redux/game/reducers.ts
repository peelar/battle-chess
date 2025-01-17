import uuid4 from "uuid";
import { gameActions } from "../rootTypes";
import { State, Action } from "./interface";

export const MOBILE_LARGE_STATE: State = {
  round: 0,
  activeTeam: 0,
  events: [],
  finished: false
};

const gameState = (state = MOBILE_LARGE_STATE, action: Action): State => {
  switch (action.type) {
    case gameActions.incrementRound:
      return {
        ...state,
        round: state.round + 1
      };
    case gameActions.changeActiveTeam:
      return {
        ...state,
        activeTeam: state.activeTeam === 0 ? 1 : 0
      };
    case gameActions.createEvent:
      return {
        ...state,
        events: [...state.events, { id: uuid4(), ...action.payload }]
      };
    case gameActions.finishGame:
      return {
        ...state,
        finished: true
      };

    default:
      return state;
  }
};

export default gameState;
