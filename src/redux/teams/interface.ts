import { teamsActions } from "../rootTypes";

export interface Team {
  uuid: number;
}

export interface Action {
  type: teamsActions;
  payload: Team[];
  uuid?: number;
}
