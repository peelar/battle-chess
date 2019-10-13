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
    case teamsActions.togglePlayerActiveness: {
      const { uuid } = action.payload;
      const teams = [...state.teams];

      const teamMemberIndex = teams.findIndex((member) => member.id === uuid);
      const newPlayer = { ...teams[teamMemberIndex], active: !teams[teamMemberIndex].active };
      const newTeams = replaceArrayItem(teams, teamMemberIndex, newPlayer);

      return {
        teams: newTeams,
      };
    }
    case teamsActions.changePlayerPosition: {
      const { activePlayerId, targetPlayer, field } = action.payload;
      const index = state.teams.findIndex((player) => player.id === activePlayerId);
      const newPlayer = {
        ...targetPlayer, active: false, fieldId: field.fieldId, coordinates: [...field.point],
      };
      const newTeams = replaceArrayItem([...state.teams], index, newPlayer);
      return {
        teams: newTeams,
      };
    }
    default:
      return state;
  }
};

export default teamsState;
