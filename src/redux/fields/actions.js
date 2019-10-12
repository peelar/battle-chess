/* eslint-disable import/prefer-default-export */
import { fieldsActions } from '../rootTypes';

export const changeFieldsState = (fields) => ({
  type: fieldsActions.changeFields,
  payload: [...fields],
});
