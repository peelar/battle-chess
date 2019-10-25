import { fieldsActions, teamsActions } from "../rootTypes";
import { Player } from "../teams/interface";

export interface Field {
  fieldId: number;
  point: number[];
  inRange: boolean;
  inDanger: boolean;
  coordinates?: number[];
  userId?: number;
  team?: number;
  character: {
    present: boolean;
    uuid: number;
    team: number;
  };
}

export interface Move {
  targetField: Field;
  characterField: {
    present: boolean;
    team: number;
    uuid: number;
  };
}

export interface Range {
  player: Player;
  radiusFields: [];
}

export interface State {
  fields: Field[];
}

export interface Action {
  type: fieldsActions | teamsActions;
  fields: Field[];
  move: Move;
  range: Range;
  player: Player;
  kill: {
    player: Player;
  };
  // import Player && player: Player;
}
