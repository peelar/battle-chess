import { charactersActions } from '../rootTypes';
import { replaceArrayItem } from '../helpers';

export const DEFAULT_STATE = {
  teams: [],
};

const charactersState = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case charactersActions.changeTeams:
      return {
        teams: [...action.payload],
      };
    case charactersActions.toggleMemberActiveness: {
      const { uuid } = action.payload;
      const teamsState = [...state.teams];

      const teamMemberIndex = teamsState.findIndex((member) => member.id === uuid);
      const newTeamMember = { ...teamsState[teamMemberIndex], active: !teamsState[teamMemberIndex].active };
      const newTeams = replaceArrayItem(teamsState, teamMemberIndex, newTeamMember);

      return {
        teams: newTeams,
      };
    }
    default:
      return state;
  }
};

export default charactersState;
