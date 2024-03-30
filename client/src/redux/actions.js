import axios from "axios";
import { ADD_EVENT, GET_EVENT, EVENT_FAILURE } from "./action_types";
const URL = "http://localhost:4000";
export const addEvent = (eventData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/evento",
        eventData
      );
      return dispatch({
        type: ADD_EVENT,
        payload: response.data,
      });
    } catch (error) {
      if (error.response && error.response.data) {
        dispatch({
          type: EVENT_FAILURE,
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: EVENT_FAILURE,
          payload: "Ocurrió un error al procesar la solicitud.",
        });
      }
    }
  };
};

export const getEvents = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL}/eventos`);
    dispatch({ type: GET_EVENT, payload: data });
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch({
        type: EVENT_FAILURE,
        payload: error.response.data,
      });
    } else {
      dispatch({
        type: EVENT_FAILURE,
        payload: "Ocurrió un error al procesar la solicitud.",
      });
    }
  }
};
