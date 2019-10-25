/* eslint-disable import/prefer-default-export */
import { GameEvent } from "./interface";
import { gameActions } from "../rootTypes";

export const incrementRound = (): { type: gameActions } => ({
  type: gameActions.incrementRound
});

export const changeActiveTeam = (): { type: gameActions } => ({
  type: gameActions.changeActiveTeam
});

export const addGameEvent = (
  params: GameEvent
): { type: gameActions; payload: GameEvent } => ({
  type: gameActions.createEvent,
  payload: {
    ...params
  }
});

export const finishGame = (): { type: gameActions } => ({
  type: gameActions.finishGame
});
