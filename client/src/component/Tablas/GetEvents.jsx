import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { getDataEvent } from "../../redux/actions";
import { FaPencil, FaEye, FaEraser } from "react-icons/fa6";

import Header from "../header/Header";
import MenuGlobal from "../menu/MenuGlobal";
import Event from "../form/Event";
import styles from "./tablas.module.css";

function GetEvents() {
  const dispatch = useDispatch();
  const eventos = useSelector((state) => state.data.eventos);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEdit = (index) => {
    // Lógica para editar el elemento con el índice proporcionado
    console.log("Edit item at index:", index);
  };

  const handleViewDetails = (index) => {
    // Lógica para ver más detalles del elemento con el índice proporcionado
    console.log("View details of item at index:", index);
  };

  const handleDelete = (index) => {
    // Lógica para eliminar el elemento con el índice proporcionado
    console.log("Delete item at index:", index);
  };

  useEffect(() => {
    dispatch(getDataEvent())
      .then(() => setLoading(false)) // Una vez que los datos se cargan, cambia el estado de carga a falso
      .catch((error) => console.error("Error fetching data:", error));
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      <MenuGlobal />
      <main className={styles.container}>
        <div className={styles.pageHeader}>
          <h2 className={styles.subtitle}>Lista de Eventos</h2>
          <button onClick={handleOpenModal}>➕ Agregar evento</button>
        </div>

        {loading ? ( // Mostrar un indicador de carga mientras se cargan los datos
          <p>Loading...</p>
        ) : (
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
            {eventos && eventos.length > 0 ? (
              <tbody>
                {eventos.map((evento, index) => (
                  <tr key={index}>
                    <td>{evento.event_name}</td>
                    <td>{evento.event_type}</td>

                    <td>{evento.start_date}</td>
                    <td>{evento.end_date}</td>

                    <td>{evento.event_state}</td>
                    <td className={styles.actions}>
                      <button onClick={() => handleEdit(index)}>
                        <FaPencil className={styles.icon_mobile} />
                      </button>
                      <button onClick={() => handleViewDetails(index)}>
                        <FaEye className={styles.icon_mobile} />
                      </button>
                      <button onClick={() => handleDelete(index)}>
                        <FaEraser className={styles.icon_mobile} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="6">No hay eventos disponibles.</td>
                </tr>
              </tbody>
            )}
          </table>
        )}
      </main>
      {showModal && (
        <div className={styles.modalMain}>
          <div className={styles.modalContent}>
            <Event onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
}

export default GetEvents;
