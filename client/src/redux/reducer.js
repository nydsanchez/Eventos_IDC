import { ADD_EVENT, ADD_EVENT_FAILURE } from "./action_types";

const initialState = {
  event: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_EVENT:
      return {
        ...state,
        event: payload,
      };

    case ADD_EVENT_FAILURE:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default reducer;
