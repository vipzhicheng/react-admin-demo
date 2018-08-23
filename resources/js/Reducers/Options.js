import { FETCH_OPTIONS_SUCCESS } from '../Actions/Options'

export function apiOptionsReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_OPTIONS_SUCCESS: {
      return action.data
    }
    default: {
      return state
    }
  }
}
