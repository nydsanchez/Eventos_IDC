import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { getDataEvent, deleteEvent } from "../../redux/actions";
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
  const [selectedEvent, setSelectedEvent] = useState(null);

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
    setSelectedEvent(eventos[index]);
  };

  const handleDelete = (index) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar este evento?"
    );
    if (confirmed) {
      dispatch(deleteEvent(eventos[index].id_event));
    }
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
        <div className={styles.grid_container_2col}>
          {loading ? ( // Mostrar un indicador de carga mientras se cargan los datos
            <p>Loading...</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Fecha de inicio</th>

                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              {eventos && eventos.length > 0 ? (
                <tbody>
                  {eventos.map((evento, index) => (
                    <tr key={index}>
                      <td>{evento.event_name}</td>

                      <td>{evento.start_date}</td>

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

          <div className={styles.eventDetail}>
            {selectedEvent && (
              <>
                <h2>{selectedEvent.event_name}</h2>
                <h3>{selectedEvent.event_type}</h3>
                <h3>{selectedEvent.event_state}</h3>
                <p>{selectedEvent.start_date}</p>
                <p>{selectedEvent.end_date}</p>
                <h3>{selectedEvent.num_tickets}</h3>
                <p>{selectedEvent.event_desc}</p>
              </>
            )}
          </div>
        </div>
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
