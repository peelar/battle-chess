import { teamsActions } from "../rootTypes";
import { replaceArrayItem } from "../helpers";
import { State, Action } from "./interface";

export const MOBILE_LARGE_STATE: State = {
  teams: []
};

const teamsState = (state = MOBILE_LARGE_STATE, action: Action): State => {
  switch (action.type) {
    case teamsActions.changeTeams:
      return {
        teams: [...action.teams]
      };
    case teamsActions.togglePlayerActiveness: {
      const { uuid } = action.activeness;
      const teams = [...state.teams];

      const teamMemberIndex = teams.findIndex(member => member.id === uuid);
      const newPlayer = {
        ...teams[teamMemberIndex],
        active: !teams[teamMemberIndex].active
      };
      const newTeams = replaceArrayItem(teams, teamMemberIndex, newPlayer);

      return {
        teams: newTeams
      };
    }
    case teamsActions.changePlayerPosition: {
      const { activePlayerId, targetPlayer, field } = action.position;
      const index = state.teams.findIndex(
        player => player.id === activePlayerId
      );
      const newPlayer = {
        ...targetPlayer,
        fieldId: field.fieldId,
        coordinates: [...field.point],
        attributes: {
          ...targetPlayer.attributes,
          moves: targetPlayer.attributes.moves - 1
        }
      };
      const newTeams = replaceArrayItem([...state.teams], index, newPlayer);
      return {
        teams: newTeams
      };
    }
    case teamsActions.attackPlayer: {
      const { victimId, attackerId, damage } = action.attack;

      const victimIndex = state.teams.findIndex(
        player => player.id === victimId
      );
      const attackerIndex = state.teams.findIndex(
        player => player.id === attackerId
      );

      const victim = { ...state.teams[victimIndex] };
      const attacker = { ...state.teams[attackerIndex] };

      const newHp = victim.attributes.currentHp - damage;
      const newMoves = attacker.attributes.moves - 1;

      const newVictim = {
        ...victim,
        attributes: { ...victim.attributes, currentHp: newHp }
      };

      const newAttacker = {
        ...attacker,
        attributes: { ...attacker.attributes, moves: newMoves }
      };

      const newVictimTeams = replaceArrayItem(
        [...state.teams],
        victimIndex,
        newVictim
      );
      const newTeams = replaceArrayItem(
        newVictimTeams,
        attackerIndex,
        newAttacker
      );
      return {
        teams: newTeams
      };
    }
    case teamsActions.killPlayer: {
      const { player } = action.kill;
      const { id } = player;

      const newTeams = [
        ...state.teams.filter(foundPlayer => foundPlayer.id !== id)
      ];
      return {
        teams: newTeams
      };
    }
    default:
      return state;
  }
};

export default teamsState;
