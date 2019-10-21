/* eslint-disable import/prefer-default-export */
import { teamsActions } from "../rootTypes";
import { Team, Action } from "./interface";

export const togglePlayerActiveness = (
  uuid: number
): { type: teamsActions; payload: { uuid: number } } => ({
  type: teamsActions.togglePlayerActiveness,
  payload: {
    uuid
  }
});

export const changeTeamsState = (
  teams: Team[]
): { type: teamsActions; payload: Team[] } => ({
  type: teamsActions.changeTeams,
  payload: [...teams]
});

export const changePlayerPosition = (params: Team[]): Action => ({
  type: teamsActions.changePlayerPosition,
  payload: {
    ...params
  }
});

export const attackPlayer = (params: Team[]): Action => ({
  type: teamsActions.attackPlayer,
  payload: {
    ...params
  }
});

export const killPlayer = (params: Team[]): Action => ({
  type: teamsActions.killPlayer,
  payload: {
    ...params
  }
});
