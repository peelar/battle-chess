import { fieldsActions } from '../rootTypes';
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

      const newFieldIndex = state.fields.findIndex((foundField) => foundField.fieldId === targetId);
      const newField = { ...targetField, character: { ...updatedFieldState } };
      const newFieldsState = replaceArrayItem([...state.fields], newFieldIndex, newField);

      return {
        fields: [...newFieldsState],
      };
    }
    case fieldsActions.setFieldsInRange: {
      const { fields } = action.payload;
      const newFields = [...state.fields].map((field) => {
        let inRange = false;
        fields.forEach((coordinate) => {
          const check = checkBothCoordinates(field.point, coordinate);

          if (check && !field.character.present) inRange = true;
        });
        return { ...field, inRange };
      });

      return {
        fields: [...newFields],
      };
    }
    case fieldsActions.clearFieldsInRange: {
      const newFields = [...state.fields].map((field) => ({ ...field, inRange: false }));

      return {
        fields: [...newFields],
      };
    }
    default:
      return state;
  }
};

export default fieldsState;
