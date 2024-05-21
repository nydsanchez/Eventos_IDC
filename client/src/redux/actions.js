import axios from "axios";
import {
  GET_DATA_EVENT,
  ADD_DATA_EVENT,
  UPDATE_DATA,
  DELETE_EVENT,
} from "./action_types";

const URL = "http://localhost:4000";

export const addDataEvent = (newData) => async (dispatch) => {
  try {
    // console.log("datos a agregar en el action :", newData);
    const { data } = await axios.post(`${URL}/eventos`, newData);
    // console.log("respuesta despues del axios: ", data);
    dispatch({
      type: ADD_DATA_EVENT,
      payload: data,
    });
    return data;
  } catch (error) {
    console.warn("Error agregando evento:", error);
    throw error;
  }
};

export const getDataEvent = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL}/eventos`);
    dispatch({
      type: GET_DATA_EVENT,
      payload: data,
    });
  } catch (error) {
    console.warn(error);
  }
};

export const updateDataEvent = (newData) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${URL}/eventos/${newData.id_event}`,
        newData
      );
      dispatch({
        type: UPDATE_DATA,
        payload: response.data,
      });
    } catch (error) {
      console.warn(error);
    }
  };
};

export const deleteEvent = (eventId) => async (dispatch) => {
  try {
    await axios.delete(`${URL}/eventos/${eventId}`);
    dispatch({
      type: DELETE_EVENT,
      payload: eventId, // Envía el ID del evento eliminado al reducer
    });
    dispatch(getDataEvent());
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};
