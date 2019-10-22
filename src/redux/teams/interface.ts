import { teamsActions } from "../rootTypes";
import { Field } from "../fields/interface";

export interface Player {
  uuid?: number;
  active: boolean;
  id: number;
  coordinates: number[];
  fieldId: number;
  team: number;
  attributes: {
    name: string;
    maxHp: number;
    currentHp: number;
    attack: number;
    moves: number;
    range: number;
  };
}

export type Activeness = {
  uuid: number;
};

export type Position = {
  activePlayerId: number;
  targetPlayer: Player;
  field: Field;
};

export type Attack = {
  victimId: number;
  attackerId: number;
  damage: number;
};

export interface Action {
  type: teamsActions;
  activeness: Activeness;
  position: Position;
  attack: Attack;
  kill: {
    player: Player;
  };
  teams: Player[];
  player: {
    player: Player;
  };
}

export interface State {
  teams: Player[];
}
