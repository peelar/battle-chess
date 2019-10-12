/* eslint-disable import/prefer-default-export */
import { arenaActions } from '../rootTypes';

export const changeArenaState = (arena) => ({
  type: arenaActions.changeArena,
  payload: [...arena],
});
