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
