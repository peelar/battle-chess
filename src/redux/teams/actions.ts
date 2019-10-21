import { Activeness, Player, Action, Attack, Position } from "./interface";
/* eslint-disable import/prefer-default-export */
import { teamsActions } from "../rootTypes";

export const togglePlayerActiveness = (
  uuid: number
): { type: teamsActions; activeness: Activeness } => ({
  type: teamsActions.togglePlayerActiveness,
  activeness: {
    uuid
  }
});

export const changePlayersState = (
  teams: Player[]
): { type: teamsActions; teams: Player[] } => ({
  type: teamsActions.changeTeams,
  teams: [...teams]
});

export const changePlayerPosition = (
  params: Position
): { type: teamsActions; position: Position } => ({
  type: teamsActions.changePlayerPosition,
  position: {
    ...params
  }
});

export const attackPlayer = (
  params: Attack
): { type: teamsActions; attack: Attack } => ({
  type: teamsActions.attackPlayer,
  attack: {
    ...params
  }
});

export const killPlayer = (
  params: Player
): { type: teamsActions; kill: Player } => ({
  type: teamsActions.killPlayer,
  kill: {
    ...params
  }
});
