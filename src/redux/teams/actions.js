/* eslint-disable import/prefer-default-export */
import { teamsActions } from '../rootTypes';

export const toggleTeamMemberActiveness = (uuid) => ({
  type: teamsActions.toggleMemberActiveness,
  payload: {
    uuid,
  },
});

export const changeTeamsState = (teams) => ({
  type: teamsActions.changeTeams,
  payload: [...teams],
});
