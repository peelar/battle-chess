import { Field } from "./fields/interface";

const generateField = ({
  fieldId,
  coordinates,
  userId,
  team
}: {
  fieldId: number;
  coordinates: number[];
  userId: any;
  team: any;
}): Field => ({
  fieldId,
  point: [...coordinates],
  inRange: false,
  inDanger: false,
  character: { present: userId !== null, uuid: userId, team }
});

const generateGridPoint = ({
  fieldId,
  coordinates
}: {
  fieldId: number;
  coordinates: number[];
}): { id: number; point: number[] } => ({
  id: fieldId,
  point: [...coordinates]
});

export { generateGridPoint, generateField };
