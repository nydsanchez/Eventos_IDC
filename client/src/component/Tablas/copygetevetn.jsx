import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { getDataEvent } from "../../redux/actions";
import { FaPencil, FaEye, FaEraser } from "react-icons/fa6";

import Header from "../header/Header";
import MenuGlobal from "../menu/MenuGlobal";

import styles from "./tablas.module.css";

function GetEvents() {
  const dispatch = useDispatch();
  const eventos = useSelector((state) => state.data.eventos);
  // const handleEdit = (index) => {
  //   // Lógica para editar el elemento con el índice proporcionado
  //   console.log("Edit item at index:", index);
  // };

  // const handleViewDetails = (index) => {
  //   // Lógica para ver más detalles del elemento con el índice proporcionado
  //   console.log("View details of item at index:", index);
  // };

  // const handleDelete = (index) => {
  //   // Lógica para eliminar el elemento con el índice proporcionado
  //   console.log("Delete item at index:", index);
  // };

  useEffect(() => {
    dispatch(getDataEvent());
  }, [dispatch]);

  console.log(eventos);

  return (
    <div className="app">
      <Header />
      <MenuGlobal />
      <main className={styles.container}>
        <div className={styles.pageHeader}>
          <h2 className={styles.subtitle}>Lista de Eventos</h2>
          <NavLink to="eventos/nuevo">
            <button>➕ Agregar evento</button>
          </NavLink>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Tipo de evento</th>
              <th scope="col">Fecha de inicio</th>
              <th scope="col">Fecha de finalizacion</th>
              <th scope="col">Estado del evento</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map((evento, index) => (
              <tr key={index}>
                <td>
                  {evento.event_name
                    ? evento.event_name
                    : "Nombre no disponible"}
                </td>
                <td>
                  {evento.event_type ? evento.event_type : "Tipo no disponible"}
                </td>
                <td>
                  {evento.start_date
                    ? evento.start_date
                    : "Fecha de inicio no disponible"}
                </td>
                <td>
                  {evento.end_date
                    ? evento.end_date
                    : "Fecha de finalización no disponible"}
                </td>
                <td>
                  {evento.event_state
                    ? evento.event_state
                    : "Estado no disponible"}
                </td>
                <td className={styles.actions}>
                  {/* <button onClick={() => handleEdit(index)}>
                      <FaPencil className={styles.icon_mobile} />
                    </button>
                    <button onClick={() => handleViewDetails(index)}>
                      <FaEye className={styles.icon_mobile} />
                    </button>
                    <button onClick={() => handleDelete(index)}>
                      <FaEraser className={styles.icon_mobile} />
                    </button> */}
                  <button>
                    <FaPencil className={styles.icon_mobile} />
                  </button>
                  <button>
                    <FaEye className={styles.icon_mobile} />
                  </button>
                  <button>
                    <FaEraser className={styles.icon_mobile} />
                  </button>
                </td>
              </tr>
            ))}
            {eventos.length === 0 && (
              <tr>
                <td colSpan="6">No hay eventos disponibles.</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default GetEvents;
