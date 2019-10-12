/* eslint-disable import/prefer-default-export */
import { charactersActions } from '../rootTypes';

export const toggleTeamMemberActiveness = (uuid) => ({
  type: charactersActions.toggleMemberActiveness,
  payload: {
    uuid,
  },
});

export const changeTeamsState = (teams) => ({
  type: charactersActions.changeTeams,
  payload: [...teams],
});
