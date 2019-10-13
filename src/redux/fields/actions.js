/* eslint-disable import/prefer-default-export */
import { fieldsActions } from '../rootTypes';

export const changeFieldsState = (fields) => ({
  type: fieldsActions.changeFields,
  payload: [...fields],
});

export const changeFieldsPlayer = (params) => ({
  type: fieldsActions.handleMove,
  payload: {
    ...params,
  },
});
