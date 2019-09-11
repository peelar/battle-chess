import { charactersActions } from '../rootTypes';

export const DEFAULT_STATE = {

};

const charactersState = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    // case charactersActions.toggle:
    //   return { ...state, navbar_open: !state.navbar_open };
    default:
      return state;
  }
};

export default charactersState;
