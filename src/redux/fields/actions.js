/* eslint-disable import/prefer-default-export */
import { fieldsActions } from '../rootTypes';

export const changeFieldsState = (fields) => ({
  type: fieldsActions.changeFields,
  payload: [...fields],
});

export const handleMove = (params) => ({
  type: fieldsActions.handleMove,
  payload: {
    ...params,
  },
});

export const setFieldsInRange = (params) => ({
  type: fieldsActions.setFieldsInRange,
  payload: {
    ...params,
  },
});

export const clearFieldsInRange = () => ({
  type: fieldsActions.clearFieldsInRange,
});
