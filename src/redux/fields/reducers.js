import { fieldsActions } from '../rootTypes';

export const DEFAULT_STATE = {
  fields: [],
};

const fieldsState = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case fieldsActions.changeFields:
      return {
        fields: [...action.payload],
      };
    default:
      return state;
  }
};

export default fieldsState;
