// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer"; // Importa el rootReducer

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
  // devTools: process.env.NODE_ENV !== "production", // Habilita Redux DevTools en desarrollo
});

export default store;
