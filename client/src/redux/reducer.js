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
  // console.log("Estado global antes de la acción:", state);
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
      // console.log(
      //   "Payload de la acción ADD_DATA_EVENT en el reducer:",
      //   payload
      // );
      const newState = {
        ...state,
        data: {
          ...state.data,
          eventos: [...state.data.eventos, payload], // Agrega el nuevo dato al final del array existente
        },
        loading: false,
        success: true,
        error: null,
      };
      // console.log(
      //   "Estado global después de la acción en el reducer:",
      //   newState
      // );
      return newState;
    }

    default:
      return state;
  }
};

export default reducer;
