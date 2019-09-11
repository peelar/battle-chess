import { fieldsActions } from '../rootTypes';

export const DEFAULT_STATE = {

};

const fieldsState = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    // case fieldsActions.toggle:
    //   return { ...state, navbar_open: !state.navbar_open };
    default:
      return state;
  }
};

export default fieldsState;
