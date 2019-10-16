import uuid4 from 'uuid';

const names = [
  'Adam', 'Albert', 'David', 'Eugene', 'Hubert', 'George', 'Xavier', 'Martin', 'Paul', 'Raymond', 'Roman', 'Simon', 'Zeno', 'Amanda', 'Blanca', 'Cynthia', 'Edith', 'Felicia', 'Helen', 'Yvonne', 'Camille', 'Lily', 'Marina', 'Monica', 'Ursula', 'Rebecca', 'Sandra', 'Sylvia', 'Sophia', 'Bruce', 'Joshua', 'Rose', 'Max', 'Alfred', 'Marika', 'Steven',
];

let uniqueNames = [...names];

const getRandomInt = (min, max) => {
  const minNum = Math.ceil(min);
  const maxNum = Math.floor(max);
  return Math.floor(Math.random() * (maxNum - minNum)) + minNum;
};

const getRandomPlayerName = () => {
  const randomIndex = getRandomInt(0, uniqueNames.length);
  const name = uniqueNames[randomIndex];

  uniqueNames = uniqueNames.filter((el) => el !== name);
  return name;
};

const generateField = ({
  fieldId, coordinates, userId, team,
}) => ({
  fieldId, point: [...coordinates], inRange: false, character: { present: userId !== null, uuid: userId, team },
});

const generateGridPoint = ({ fieldId, coordinates }) => (
  { id: fieldId, point: [...coordinates] }
);
class gameGenerator {
  constructor(dim, maxHpPerPlayer, maxAttackPerPlayer) {
    this.dim = dim;
    this.maxHpPerPlayer = maxHpPerPlayer;
    this.maxHpPerTeam = null;
    this.teamsHp = [];
    this.teamsAttack = [];
    this.maxAttackPerPlayer = maxAttackPerPlayer;
    this.maxAttackPerTeam = null;
    this.teamsAttackLeft = [dim * maxAttackPerPlayer, dim * maxAttackPerPlayer];
    this.xy_teams = [];
    this.fields = [];
    this.grid = [];
  }

  generatePlayer({
    userId, team, fieldId, coordinates, index,
  }) {
    const randomName = getRandomPlayerName();
    const characterHpPoints = this.teamsHp[team][index];
    const characterAttackPoints = this.teamsAttack[team][index];
    const moves = getRandomInt(3, 15);

    return ({
      id: userId,
      coordinates: [...coordinates],
      fieldId,
      team,
      active: false,
      attributes: {
        name: randomName, maxHp: characterHpPoints, currentHp: characterHpPoints, attack: characterAttackPoints, moves,
      },
    });
  }

  generateProperty({
    min = 1, teamMax, perPlayerMax, target, team,
  }) {
    const minTeamProp = this.dim * min;
    const maxTeamProp = (this[perPlayerMax] - 1) * this.dim;
    const properties = Array.from(Array(this.dim)).fill(1);

    let teamSum = this[teamMax] ? this[teamMax] : getRandomInt(minTeamProp, maxTeamProp);
    this[teamMax] = teamSum;

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

    this[target] = newProperties;
  }

  createGameState() {
    const lastXCoordinate = this.dim - 1;
    this.generateProperty({
      teamMax: 'maxHpPerTeam', perPlayerMax: 'maxHpPerPlayer', target: 'teamsHp', team: 0,
    });
    this.generateProperty({
      teamMax: 'maxHpPerTeam', perPlayerMax: 'maxHpPerPlayer', target: 'teamsHp', team: 1,
    });

    this.generateProperty({
      teamMax: 'maxAttackPerTeam', perPlayerMax: 'maxAttackPerPlayer', target: 'teamsAttack', team: 0,
    });
    this.generateProperty({
      teamMax: 'maxAttackPerTeam', perPlayerMax: 'maxAttackPerPlayer', target: 'teamsAttack', team: 1,
    });

    for (let j = 0; j < this.dim; j += 1) {
      for (let i = 0; i < this.dim; i += 1) {
        if (j === 0) {
          const fieldId = uuid4();
          const userId = uuid4();

          const player = this.generatePlayer({
            userId, team: 0, fieldId, coordinates: [i, j], index: i,
          });
          const field = generateField({
            fieldId, coordinates: [i, j], userId, team: 0,
          });
          const gridPoint = generateGridPoint({ fieldId, coordinates: [i, j] });

          this.xy_teams.push(player);
          this.fields.push(field);
          this.grid.push(gridPoint);
        } else if (j === lastXCoordinate) {
          const userId = uuid4();
          const fieldId = uuid4();

          const player = this.generatePlayer({
            userId, team: 1, fieldId, coordinates: [i, j], index: i,
          });
          const field = generateField({
            fieldId, coordinates: [i, j], userId, team: 1,
          });
          const gridPoint = generateGridPoint({ fieldId, coordinates: [i, j] });

          this.xy_teams.push(player);
          this.fields.push(field);
          this.grid.push(gridPoint);
        } else {
          const fieldId = uuid4();

          const field = generateField({
            fieldId, coordinates: [i, j], userId: null, team: null,
          });
          const gridPoint = generateGridPoint({ fieldId, coordinates: [i, j] });

          this.fields.push(field);
          this.grid.push(gridPoint);
        }
      }
    }
  }

  getGameState() {
    return { initialTeams: [...this.xy_teams], initialFields: [...this.fields], initialGrid: [...this.grid] };
  }
}

export default gameGenerator;
