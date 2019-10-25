export enum teamsActions {
  togglePlayerActiveness = "__TOGGLE_MEMBER_TEAMS",
  changeTeams = "__CHANGE_TEAMS",
  changePlayerPosition = "__CHANGE_LOCATION_TEAMS",
  attackPlayer = "__ATTACK_PLAYER",
  killPlayer = "__KILL_PLAYER"
}

export enum fieldsActions {
  changeFields = "__CHANGE_FIELDS",
  handleMove = "__HANDLE_MOVE_FIELDS",
  setFieldsInRange = "__SET_RANGE_FIELDS",
  clearFieldsInRange = "__CLEAR_RANGE_FIELDS"
}

export enum gameActions {
  incrementRound = "__INCREMENT_ROUND_GAME",
  changeActiveTeam = "__CHANGE_TEAM_GAME",
  createEvent = "__ADD_EVENT_GAME",
  finishGame = "__FINISH_GAME",
  reset = "__RESET"
}

export default {};
