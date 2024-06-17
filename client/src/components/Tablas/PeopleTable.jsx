import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getDataPeople, deletePeople } from "../../features/people/peopleSlice";
import Pagination from "../pagination/Pagination";

import { FaPencil, FaEye, FaEraser } from "react-icons/fa6";
import styles from "./tablas.module.css";

function PeopleTable() {
  const dispatch = useDispatch();
  const people = useSelector((state) => state.people.data);
  const status = useSelector((state) => state.people?.status);
  const error = useSelector((state) => state.people?.error);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;

  const handleEdit = (id) => {
    console.log("Edit item at index:", id);
  };

  const handleViewDetails = (id) => {
    console.log("View details of item at index:", id);
  };

  const handleDelete = (id) => {
    console.log(id);
    var confirmacion = window.confirm(
      "¿Está seguro que desea eliminar este registro? La acción no se puede deshacer."
    );
    if (confirmacion) {
      dispatch(deletePeople(id));
      window.alert("El registro ha sido borrado");
    }
  };

  console.log(people);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getDataPeople());
    }
  }, [status, dispatch]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = people.slice(indexOfFirstRecord, indexOfLastRecord);

  let content;

  if (status === "loading") {
    content = (
      <tbody>
        <tr>
          <td colSpan="3">Loading...</td>
        </tr>
      </tbody>
    );
  } else if (status === "succeeded") {
    content = (
      <tbody>
        {currentRecords.map((per) => (
          <tr key={per.id}>
            <td>{per.name}</td>
            <td>{per.phone}</td>
            <td className={styles.actions}>
              <button onClick={() => handleEdit(per.cedula)}>
                <FaPencil className={styles.icon_mobile} />
              </button>
              <button onClick={() => handleViewDetails(per.cedula)}>
                <FaEye className={styles.icon_mobile} />
              </button>
              <button onClick={() => handleDelete(per.cedula)}>
                <FaEraser className={styles.icon_mobile} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  } else if (status === "failed") {
    content = (
      <tbody>
        <tr>
          <td colSpan="3">{error}</td>
        </tr>
      </tbody>
    );
  }

  return (
    <main>
      <h2 className={styles.subtitle}>Listado de Personas</h2>
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
              <th scope="col">Nombre</th>
              <th scope="col">Teléfono</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          {content}
        </table>
      </div>
    </main>
  );
}

export default PeopleTable;
