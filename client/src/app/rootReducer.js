import { combineReducers } from "@reduxjs/toolkit";
import churchReducer from "../features/church/churchSlice";
import peopleReducer from "../features/people/peopleSlice";
import ticketReducer from "../features/ticket/ticketSlice";
// Importa los otros reducers aquí

const rootReducer = combineReducers({
  churches: churchReducer,
  people: peopleReducer,
  tickets: ticketReducer,
  // Añade los otros reducers aquí
});

export default rootReducer;
