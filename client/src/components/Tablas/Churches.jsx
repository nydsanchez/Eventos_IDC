import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getDataChurch, deleteChurch } from "../../features/church/churchSlice";
import Pagination from "../pagination/Pagination";

import { FaPencil, FaEye, FaEraser } from "react-icons/fa6";
import styles from "./tablas.module.css";

function Churches() {
  const dispatch = useDispatch();
  const churches = useSelector((state) => state.churches.data);
  const status = useSelector((state) => state.churches?.status);
  const error = useSelector((state) => state.churches?.error);

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
      dispatch(deleteChurch(id));
      window.alert("El registro ha sido borrado");
    }
  };

  console.log("Renderizando Churches");

  useEffect(() => {
    if (status === "idle") {
      dispatch(getDataChurch());
    }
  }, [status, dispatch]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = churches.slice(indexOfFirstRecord, indexOfLastRecord);

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
        {currentRecords.map((church) => (
          <tr key={church.id}>
            <td>{church.church_name}</td>
            <td>{church.church_phone}</td>
            <td className={styles.actions}>
              <button onClick={() => handleEdit(church.id)}>
                <FaPencil className={styles.icon_mobile} />
              </button>
              <button onClick={() => handleViewDetails(church.id)}>
                <FaEye className={styles.icon_mobile} />
              </button>
              <button onClick={() => handleDelete(church.id)}>
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
      <h2 className={styles.subtitle}>Lista de Congregaciones</h2>
      <div className={styles.pag}>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(churches.length / recordsPerPage)}
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

export default Churches;
