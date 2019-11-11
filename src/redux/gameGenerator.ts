import uuid4 from "uuid";
import { Field } from "./fields/interface";
import { Player } from "./teams/interface";
import { getRandomInt, getRandomPlayerName } from "./random";
import { generateField, generateGridPoint } from "./generators";

const names = [
  "Adam",
  "Albert",
  "David",
  "Eugene",
  "Hubert",
  "George",
  "Xavier",
  "Martin",
  "Paul",
  "Raymond",
  "Roman",
  "Simon",
  "Zeno",
  "Amanda",
  "Blanca",
  "Cynthia",
  "Edith",
  "Felicia",
  "Helen",
  "Yvonne",
  "Camille",
  "Lily",
  "Marina",
  "Monica",
  "Ursula",
  "Rebecca",
  "Sandra",
  "Sylvia",
  "Sophia",
  "Bruce",
  "Joshua",
  "Rose",
  "Max",
  "Alfred",
  "Marika",
  "Steven"
];

type nestedArray = {
  [index: number]: number;
};

class GameGenerator {
  private dim: number;

  private maxHpPerPlayer: number;

  private maxHpPerTeam: null | number;

  private teamsHp: nestedArray[];

  private maxMovesPerPlayer: number;

  private maxMovesPerTeam: null | number;

  private teamsMoves: nestedArray[];

  private maxAttackPerPlayer: number;

  private maxAttackPerTeam: null | number;

  private teamsAttack: nestedArray[];

  private maxDistancePerPlayer: number;

  private maxDistancePerTeam: null | number;

  private teamsDistance: nestedArray[];

  private xyTeams: Player[];

  private fields: Field[];

  private grid: nestedArray[];

  private uniqueNames: string[];

  constructor(
    dim: number,
    maxHpPerPlayer: number,
    maxAttackPerPlayer: number,
    maxMovesPerPlayer = 15,
    maxDistancePerPlayer = 2
  ) {
    this.dim = dim;

    this.maxHpPerPlayer = maxHpPerPlayer;
    this.maxHpPerTeam = null;
    this.teamsHp = [];

    this.maxMovesPerPlayer = maxMovesPerPlayer;
    this.maxMovesPerTeam = null;
    this.teamsMoves = [];

    this.maxAttackPerPlayer = maxAttackPerPlayer;
    this.maxAttackPerTeam = null;
    this.teamsAttack = [];

    this.maxDistancePerPlayer = maxDistancePerPlayer;
    this.maxDistancePerTeam = null;
    this.teamsDistance = [];

    this.xyTeams = [];
    this.fields = [];
    this.grid = [];

    this.uniqueNames = [...names];
  }

  generatePlayer({
    userId,
    team,
    fieldId,
    coordinates,
    index
  }: {
    userId: number;
    team: number;
    fieldId: number;
    coordinates: number[];
    index: number;
  }): Player {
    const randomName = getRandomPlayerName(this.uniqueNames);
    this.uniqueNames = this.uniqueNames.filter(el => el !== randomName);

    const characterHpPoints = this.teamsHp[team][index];
    const characterAttackPoints = this.teamsAttack[team][index];
    const characterMoves = this.teamsMoves[team][index];
    const range = this.teamsDistance[team][index];

    return {
      id: userId,
      coordinates: [...coordinates],
      fieldId,
      team,
      active: false,
      attributes: {
        name: randomName,
        maxHp: characterHpPoints,
        currentHp: characterHpPoints,
        attack: characterAttackPoints,
        moves: characterMoves,
        range
      }
    };
  }

  generateProperty({
    min,
    teamMax,
    perPlayerMax,
    target,
    team
  }: {
    min: number;
    teamMax: string;
    perPlayerMax: string;
    team: number;
    target: string;
  }): any {
    const minTeamProp = this.dim * min;
    const maxTeamProp = (this[perPlayerMax] - 1) * this.dim;
    const properties = Array.from(Array(this.dim)).fill(1);

    let teamSum =
      this[teamMax] !== null
        ? this[teamMax]
        : getRandomInt(minTeamProp, maxTeamProp);

    let counter = 0;

    while (teamSum > 0) {
      if (counter === properties.length) counter = 0;
      const plus = getRandomInt(0, 2);
      const newPropertyValue = properties[counter] + plus;

      if (newPropertyValue <= this[perPlayerMax]) {
        properties[counter] = newPropertyValue;
        teamSum -= plus;
      }

      counter += 1;
    }

    const newProperties = [...this[target]];
    newProperties[team] = properties;

    return { newProperties, teamSum };
  }

  createGameState(): void {
    const lastXCoordinate = this.dim - 1;

    const properties = [
      {
        min: 1,
        teamMax: "maxHpPerTeam",
        perPlayerMax: "maxHpPerPlayer",
        target: "teamsHp"
      },
      {
        min: 1,
        teamMax: "maxAttackPerTeam",
        perPlayerMax: "maxAttackPerPlayer",
        target: "teamsAttack"
      },
      {
        min: 8,
        teamMax: "maxMovesPerTeam",
        perPlayerMax: "maxMovesPerPlayer",
        target: "teamsMoves"
      },
      {
        min: 0,
        teamMax: "maxDistancePerTeam",
        perPlayerMax: "maxDistancePerPlayer",
        target: "teamsDistance"
      }
    ];

    properties.forEach(property => {
      for (let team = 0; team <= 1; team += 1) {
        const { newProperties, teamSum } = this.generateProperty({
          ...property,
          team
        });

        this[property.target] = newProperties;
        this[property.teamMax] = teamSum;
      }
    });

    for (let j = 0; j < this.dim; j += 1) {
      for (let i = 0; i < this.dim; i += 1) {
        if (j === 0) {
          const fieldId = uuid4();
          const userId = uuid4();

          const player = this.generatePlayer({
            userId,
            team: 0,
            fieldId,
            coordinates: [i, j],
            index: i
          });
          const field = generateField({
            fieldId,
            coordinates: [i, j],
            userId,
            team: 0
          });
          const gridPoint = generateGridPoint({ fieldId, coordinates: [i, j] });

          this.xyTeams.push(player);
          this.fields.push(field);
          this.grid.push(gridPoint);
        } else if (j === lastXCoordinate) {
          const userId = uuid4();
          const fieldId = uuid4();

          const player = this.generatePlayer({
            userId,
            team: 1,
            fieldId,
            coordinates: [i, j],
            index: i
          });
          const field = generateField({
            fieldId,
            coordinates: [i, j],
            userId,
            team: 1
          });
          const gridPoint = generateGridPoint({ fieldId, coordinates: [i, j] });

          this.xyTeams.push(player);
          this.fields.push(field);
          this.grid.push(gridPoint);
        } else {
          const fieldId = uuid4();

          const field = generateField({
            fieldId,
            coordinates: [i, j],
            userId: null,
            team: null
          });
          const gridPoint = generateGridPoint({ fieldId, coordinates: [i, j] });

          this.fields.push(field);
          this.grid.push(gridPoint);
        }
      }
    }
  }

  getGameState(): {} {
    return {
      initialTeams: [...this.xyTeams],
      initialFields: [...this.fields],
      initialGrid: [...this.grid]
    };
  }
}

export default GameGenerator;
