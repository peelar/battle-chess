import { fieldsActions } from '../rootTypes';
import { replaceArrayItem } from '../helpers';

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
    default:
      return state;
  }
};

export default fieldsState;
