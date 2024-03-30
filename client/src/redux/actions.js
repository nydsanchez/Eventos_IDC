import axios from "axios";
import {
  GET_DATA,
  ADD_DATA,
  UPDATE_DATA,
  DATA_SUCCESS,
  DATA_FAILURE,
} from "./action_types";

const URL = "http://localhost:4000";

export const addData = (entity, newData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${URL}/${entity}`, newData);
      return dispatch({
        type: ADD_DATA,
        payload: { entity, data: response.data },
        success: true,
      });
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : "Error al agregar los datos";
      dispatch({
        type: DATA_FAILURE,
        payload: errorMessage,
        success: false,
      });
    }
  };
};

export const getData = (entity) => {
  return async (dispatch) => {
    dispatch({ type: GET_DATA });
    try {
      const response = await axios.get(`${URL}/${entity}`);
      dispatch({
        type: DATA_SUCCESS,
        payload: { entity, data: response.data },
        success: true,
      });
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : "Error al cargar los datos";
      dispatch({
        type: DATA_FAILURE,
        payload: errorMessage,
        success: false,
      });
    }
  };
};

export const updateData = (entity, newData) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${URL}/${entity}/${newData.id}`,
        newData
      );
      dispatch({
        type: UPDATE_DATA,
        payload: { entity, data: response.data },
        success: true,
      });
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data
        : "Error al actualizar los datos";
      dispatch({
        type: DATA_FAILURE,
        payload: errorMessage,
        success: false,
      });
    }
  };
};
// export const getInitialData = () => {
//   return async (dispatch) => {
//     try {
//       // Realizar la solicitud de datos a la API
//       const response = await fetch("URL_DE_TU_API");
//       const data = await response.json();

//       // Despachar la acción de éxito con los datos recibidos
//       dispatch(fetchDataSuccess(data));
//     } catch (error) {
//       // En caso de error, despachar la acción de falla
//       dispatch(fetchDataFailure(error.message));
//     }
//   };
// };
