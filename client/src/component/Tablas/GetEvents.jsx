import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getData } from "../../redux/actions";
import { FaPencil, FaEye, FaEraser } from "react-icons/fa6";
import styles from "./tablas.module.css";

function GetEvents() {
  const dispatch = useDispatch();
  const eventos = useSelector((state) => state.data.eventos);
  const error = useSelector((state) => state.error.message);

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
    if (error) {
      alert(error);
    } else {
      dispatch(getData("eventos"));
    }
  }, [dispatch]);

  return (
    <main>
      <h2 className={styles.subtitle}>Lista de Eventos</h2>
      <div className={styles.container}>
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
        </table>
      </div>
    </main>
  );
}

export default GetEvents;
