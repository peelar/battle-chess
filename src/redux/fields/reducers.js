import { fieldsActions, teamsActions } from '../rootTypes';
import { replaceArrayItem, checkBothCoordinates } from '../helpers';

export const DEFAULT_STATE = {
  fields: [],
};

const fieldsState = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case fieldsActions.changeFields:
      return {
        fields: [...action.payload],
      };
    case fieldsActions.handleMove: {
      const { targetId, targetField, updatedFieldState } = action.payload;

      const newFieldIndex = state.fields.findIndex(
        (foundField) => foundField.fieldId === targetId,
      );
      const newField = { ...targetField, character: { ...updatedFieldState } };
      const newFieldsState = replaceArrayItem(
        [...state.fields],
        newFieldIndex,
        newField,
      );

      return {
        fields: [...newFieldsState],
      };
    }
    case fieldsActions.setFieldsInRange: {
      const { player, radiusFields } = action.payload;
      const newFields = [...state.fields].map((field) => {
        let inRange = false;
        let inDanger = false;

        radiusFields.forEach((fields, index) => {
          const isAttackIndex = index > 0;

          fields.forEach((coordinate) => {
            const check = checkBothCoordinates(field.point, coordinate);
            const isHostile = player !== undefined ? player.team !== field.character.team : false;

            if (check && !field.character.present && !isAttackIndex) inRange = true;
            if (check && isHostile && field.character.present) inDanger = true;
          });
        });

        return { ...field, inRange, inDanger };
      });

      return {
        fields: [...newFields],
      };
    }
    case fieldsActions.clearFieldsInRange: {
      const newFields = [...state.fields].map((field) => ({
        ...field,
        inRange: false,
        inDanger: false,
      }));

      return {
        fields: [...newFields],
      };
    }
    case teamsActions.killPlayer: {
      const { player } = action.payload;
      const { fieldId } = player;

      const fieldIndex = state.fields.findIndex(
        (field) => field.fieldId === fieldId,
      );
      const updatedField = {
        ...state.fields[fieldIndex],
        character: { present: false, uuid: null, team: null },
      };
      const newFields = replaceArrayItem(
        [...state.fields],
        fieldIndex,
        updatedField,
      );

      return {
        fields: newFields,
      };
    }
    default:
      return state;
  }
};

export default fieldsState;
