import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getEvents } from "../../redux/actions";

import styles from "./tablas.module.css";

function GetEvents() {
  const dispatch = useDispatch();
  const eventos = useSelector((state) => state.events);

  console.log(eventos);
  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);
  return (
    <main className={styles.container}>
      <h2>Lista de Eventos</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Nombre</th>

            <th scope="col">Tipo de evento</th>
            <th scope="col">Fecha de inicio</th>
            <th scope="col">Fecha de finalizacion</th>

            <th scope="col">Estado del evento</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default GetEvents;
