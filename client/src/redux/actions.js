import axios from "axios";
import { GET_DATA_EVENT, ADD_DATA_EVENT, UPDATE_DATA } from "./action_types";

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
      console.warn(error);
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
