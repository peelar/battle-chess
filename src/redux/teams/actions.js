/* eslint-disable import/prefer-default-export */
import { teamsActions } from '../rootTypes';

export const togglePlayerActiveness = (uuid) => ({
  type: teamsActions.togglePlayerActiveness,
  payload: {
    uuid,
  },
});

export const changeTeamsState = (teams) => ({
  type: teamsActions.changeTeams,
  payload: [...teams],
});

export const changePlayerPosition = (params) => ({
  type: teamsActions.changePlayerPosition,
  payload: {
    ...params,
  },
});

export const attackPlayer = (params) => ({
  type: teamsActions.attackPlayer,
  payload: {
    ...params,
  },
});

export const killPlayer = (params) => ({
  type: teamsActions.killPlayer,
  payload: {
    ...params,
  },
});
