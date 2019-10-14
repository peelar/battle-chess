/* eslint-disable import/prefer-default-export */
import { gameActions } from '../rootTypes';

export const incrementRound = () => ({
  type: gameActions.incrementRound,
});

export const changeActiveTeam = () => ({
  type: gameActions.changeActiveTeam,
});

export const addGameEvent = (params) => ({
  type: gameActions.createEvent,
  payload: {
    ...params,
  },
});
