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
}) => ({ fieldId, point: [...coordinates], character: { present: userId !== null, uuid: userId, team } });

const generateGridPoint = ({ fieldId, coordinates }) => (
  { id: fieldId, point: [...coordinates] }
);

const generatePlayer = ({
  userId, team, fieldId, coordinates,
}) => {
  const randomName = getRandomPlayerName();

  return ({
    id: userId, coordinates: [...coordinates], fieldId, team, active: false, name: randomName,
  });
};


class gameGenerator {
  constructor(dim, maxPointPerPlayer) {
    this.dim = dim;
    this.maxPointPerPlayer = maxPointPerPlayer;
    this.xy_teams = [];
    this.fields = [];
    this.grid = [];
  }

  createGameState() {
    const lastXCoordinate = this.dim - 1;

    for (let j = 0; j < this.dim; j += 1) {
      for (let i = 0; i < this.dim; i += 1) {
        if (j === 0) {
          const fieldId = uuid4();
          const userId = uuid4();

          const player = generatePlayer({
            userId, team: 0, fieldId, coordinates: [0, i],
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

          const player = generatePlayer({
            userId, team: 1, fieldId, coordinates: [lastXCoordinate, i],
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
