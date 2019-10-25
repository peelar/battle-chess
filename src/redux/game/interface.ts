import { gameActions } from "../rootTypes";

export interface GameEvent {
  text: string;
  id: number;
}

export interface State {
  round: number;
  activeTeam: number;
  events: GameEvent[];
  active: boolean;
}
export interface GameEvents {
  events: GameEvent[];
}

export interface Action {
  type: gameActions;
  payload: GameEvent;
}
