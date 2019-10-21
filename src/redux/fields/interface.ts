import { fieldsActions, teamsActions } from "../rootTypes";

export interface Field {
  fieldId: number;
  point: number[];
  inRange: boolean;
  inDanger: boolean;
  character: {
    present: boolean;
    uuid: number;
    team: number;
  };
}

export interface Move {
  targetId: number;
  targetField: {};
  updatedFieldState: {
    present: boolean;
    team: number;
    uuid: number;
  };
}

export interface State {
  fields: Field[];
}

export interface Action {
  type: fieldsActions | teamsActions;
  fields: Field[];
  move: Move;
  range: any;
  player: any;
  // import Player && player: Player;
}
