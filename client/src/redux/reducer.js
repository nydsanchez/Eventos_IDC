import { ADD_EVENT, GET_EVENT, EVENT_FAILURE } from "./action_types";

const initialState = {
  events: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_EVENT:
      return {
        ...state,
        event: payload,
      };
    case GET_EVENT:
      return {
        ...state,
        events: payload,
      };
    case EVENT_FAILURE:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default reducer;
