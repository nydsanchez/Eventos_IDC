import { ADD_DATA_EVENT, GET_DATA_EVENT } from "./action_types";

const initialState = {
  data: {
    churches: [],
    eventos: [],
    tickets: [],
    people: [],
    asistencia: [],
  },
  searchResults: [],
  error: null,
  success: false,
  loading: false,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_DATA_EVENT: {
      return {
        ...state,
        data: {
          ...state.data,
          eventos: payload,
        },
        loading: false,
        error: null,
      };
    }
    case ADD_DATA_EVENT: {
      const { data } = payload;
      return {
        ...state,
        data: {
          ...state.data,
          eventos: [...state.data.eventos, data], // Agrega el nuevo dato al final del array existente
        },
        loading: false,
        success: true,
        error: null,
      };
    }

    default:
      return state;
  }
};

export default reducer;
