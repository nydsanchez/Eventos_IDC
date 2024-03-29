import axios from "axios";
import { ADD_EVENT, ADD_EVENT_FAILURE } from "./action_types";

export const addEvent = (eventData) => {
  const endpoint = "http://localhost:4000/evento";
  return async (dispatch) => {
    try {
      const response = await axios.post(endpoint, eventData);
      return dispatch({
        type: ADD_EVENT,
        payload: response.data,
      });
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch({
          type: ADD_EVENT_FAILURE,
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: ADD_EVENT_FAILURE,
          payload: "Ocurrió un error al procesar la solicitud.",
        });
      }
    }
  };
};
