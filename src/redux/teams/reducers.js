import { teamsActions } from '../rootTypes';
import { replaceArrayItem } from '../helpers';

export const DEFAULT_STATE = {
  teams: [],
};

const teamsState = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case teamsActions.changeTeams:
      return {
        teams: [...action.payload],
      };
    case teamsActions.toggleMemberActiveness: {
      const { uuid } = action.payload;
      const teams = [...state.teams];

      const teamMemberIndex = teams.findIndex((member) => member.id === uuid);
      const newTeamMember = { ...teams[teamMemberIndex], active: !teams[teamMemberIndex].active };
      const newTeams = replaceArrayItem(teams, teamMemberIndex, newTeamMember);

      return {
        teams: newTeams,
      };
    }
    default:
      return state;
  }
};

export default teamsState;
