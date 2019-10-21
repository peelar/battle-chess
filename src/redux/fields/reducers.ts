import { fieldsActions, teamsActions } from "../rootTypes";
import { replaceArrayItem, checkBothCoordinates } from "../helpers";
import { Field, State, Action } from "./interface";

export const DEFAULT_STATE: State = {
  fields: []
};

const fieldsState = (state = DEFAULT_STATE, action: Action): State => {
  switch (action.type) {
    case fieldsActions.changeFields:
      return {
        fields: [...action.fields]
      };
    case fieldsActions.handleMove: {
      const { targetId, targetField, updatedFieldState } = action.move;

      const newFieldIndex = state.fields.findIndex(
        foundField => foundField.fieldId === targetId
      );
      const newField = { ...targetField, character: { ...updatedFieldState } };
      const newFieldsState = replaceArrayItem(
        [...state.fields],
        newFieldIndex,
        newField
      );

      return {
        fields: [...newFieldsState]
      };
    }
    case fieldsActions.setFieldsInRange: {
      const { player, radiusFields } = action.range;
      const newFields = [...state.fields].map((field: Field) => {
        let inRange = false;
        let inDanger = false;

        radiusFields.forEach((fields: [], index: number) => {
          const isAttackIndex = index > 0;

          fields.forEach(coordinate => {
            const check = checkBothCoordinates(field.point, coordinate);
            const isHostile =
              player !== undefined
                ? player.team !== field.character.team
                : false;

            if (check && !field.character.present && !isAttackIndex)
              inRange = true;
            if (check && isHostile && field.character.present) inDanger = true;
          });
        });

        return { ...field, inRange, inDanger };
      });

      return {
        fields: [...newFields]
      };
    }
    case fieldsActions.clearFieldsInRange: {
      const newFields = [...state.fields].map(field => ({
        ...field,
        inRange: false,
        inDanger: false
      }));

      return {
        fields: [...newFields]
      };
    }
    case teamsActions.killPlayer: {
      const { player } = action.kill;
      const { fieldId } = player;

      const fieldIndex = state.fields.findIndex(
        field => field.fieldId === fieldId
      );
      const updatedField = {
        ...state.fields[fieldIndex],
        character: { present: false, uuid: null, team: null }
      };
      const newFields = replaceArrayItem(
        [...state.fields],
        fieldIndex,
        updatedField
      );

      return {
        fields: newFields
      };
    }
    default:
      return state;
  }
};

export default fieldsState;
