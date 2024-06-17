import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getDataTicket, anularTicket } from "../../features/ticket/ticketSlice";
import { getDataPeople } from "../../features/people/peopleSlice";
import { FaPencil, FaEye, FaX } from "react-icons/fa6";

import Pagination from "../pagination/Pagination";
import styles from "./tablas.module.css";

function TicketTable() {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets.data);
  const statusTk = useSelector((state) => state.tickets?.status);
  const errorTk = useSelector((state) => state.tickets?.error);

  const people = useSelector((state) => state.people.data);
  const statusPl = useSelector((state) => state.people?.status);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;

  const handleEdit = (id) => {
    // Lógica para editar el elemento con el índice proporcionado
    console.log("Edit item at index:", id);
  };

  const handleViewDetails = (id) => {
    // Lógica para ver más detalles del elemento con el índice proporcionado
    console.log("View details of item at index:", id);
  };

  const handleDelete = (id) => {
    dispatch(anularTicket(id));
  };
  console.log(tickets);

  useEffect(() => {
    if (statusTk === "idle" && statusPl == "idle") {
      dispatch(getDataPeople());
      dispatch(getDataTicket());
    }
  }, [statusTk, statusPl, dispatch]);

  const getPersonName = (personId) => {
    const person = people.find((p) => p.cedula === personId);
    return person ? person.name : "Desconocido";
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = tickets.slice(indexOfFirstRecord, indexOfLastRecord);

  let content;

  if (statusTk == "loading") {
    content = (
      <tbody>
        <tr>
          <td colSpan="3">Cargando los datos...</td>
        </tr>
      </tbody>
    );
  } else if (statusTk === "succeeded") {
    content = (
      <tbody>
        {currentRecords.map((tkt) => (
          <tr key={tkt.id_ticket}>
            <td>{tkt.no_ticket}</td>
            <td>{tkt.state_ticket}</td>
            <td>{getPersonName(tkt.PersonCedula)}</td>

            <td className={styles.actions}>
              <button onClick={() => handleEdit(tkt.no_ticket)}>
                <FaPencil className={styles.icon_mobile} />
              </button>
              <button onClick={() => handleViewDetails(tkt.no_ticket)}>
                <FaEye className={styles.icon_mobile} />
              </button>
              <button onClick={() => handleDelete(tkt.no_ticket)}>
                <FaX className={styles.icon_mobile} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  } else if (statusTk === "failed") {
    content = (
      <tbody>
        <tr>
          <td colSpan="3">{errorTk}</td>
        </tr>
      </tbody>
    );
  }

  return (
    <main>
      <h2 className={styles.subtitle}>Listado de Tickets</h2>
      <div className={styles.pag}>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(people.length / recordsPerPage)}
          onPageChange={setCurrentPage}
        />
      </div>

      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">No. Ticket</th>
              <th scope="col">Estado</th>
              <th scope="col">Asignado a</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          {content}
        </table>
      </div>
    </main>
  );
}

export default TicketTable;
