import { useState } from "react";
import { BsFillFloppy2Fill, BsXLg } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addDataTicket } from "../../features/ticket/ticketSlice";

import validation from "../../js/validation";
import Persona from "./People";
import styles from "./form.module.css";
import SelectPeople from "../select/selectPeople";

export default function Ticket() {
  const [showPersonaModal, setShowPersonaModal] = useState(false);

  // Función para abrir la modal de Persona
  const openPersonaModal = () => {
    setShowPersonaModal(true);
  };

  // Función para cerrar la modal de Persona
  const closePersonaModal = () => {
    setShowPersonaModal(false);
  };

  const [newData, setNewData] = useState({
    no_ticket: "",
    state_ticket: "",
    personCedula: "",
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.tickets?.error);
  const status = useSelector((state) => state.tickets?.status);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });
    const updatedErrors = validation({ ...newData, [name]: value });
    setErrors(updatedErrors);
  };

  const handleSelectPersonChange = (id) => {
    setNewData({ ...newData, personCedula: id });
  };

  function delete_formData() {
    setNewData({
      no_ticket: "",
      state_ticket: "",
      personCedula: "",
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addDataTicket(newData));
    if (status === "succeeded") {
      window.alert("Los datos se han guardado exitosamente");
      delete_formData();
    } else {
      window.alert(error);
    }
  };

  function handleClearData() {
    // showConfirmation();
    if (window.confirm("¿Estás seguro de que quieres cerrar el registro?")) {
      navigate("/home");
    }
  }

  return (
    <main>
      <div className={styles.grid_container}>
        <div className={styles.grid_container_text}>
          <h3>Registro de Tickets</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla
            placeat sequi recusandae est ducimus, adipisci nisi eveniet quo modi
            officia delectus debitis odit nostrum laudantium!
          </p>

          <form className={styles.formChurch} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="no_ticket">Número de ticket:</label>
              <input
                type="text"
                name="no_ticket"
                id="no_ticket"
                value={newData.no_ticket}
                onChange={handleChange}
              />
              {errors.e1 ? (
                <p className={styles.error_msg}>{errors.e1}</p>
              ) : (
                <p>&nbsp;</p>
              )}
            </div>

            <div>
              <label htmlFor="state_ticket">Estado del Ticket:</label>
              <select
                name="state_ticket"
                id="state_ticket"
                value={newData.state_ticket}
                onChange={handleChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="reservado">Reservado</option>
                <option value="pagado">Pagado</option>
                <option value="utilizado">Utilizado</option>
                <option value="anulado">Anulado</option>
              </select>
            </div>

            <div>
              <label htmlFor="personCedula">Asignada a:</label>
              <SelectPeople
                selectedPersonId={newData.personCedula}
                onChange={handleSelectPersonChange}
              />
            </div>
            <div>
              <button className={styles.modal_btn} onClick={openPersonaModal}>
                Agregar persona
              </button>
            </div>
            <div className={styles.formButton}>
              <button
                type="submit"
                className={styles.btn_form}
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  "Enviando..."
                ) : (
                  <>
                    <BsFillFloppy2Fill /> Guardar
                  </>
                )}
              </button>
              <button
                type="button"
                className={`${styles.btn_form} ${styles.btn_x}`}
                onClick={() => {
                  handleClearData();
                }}
                disabled={status === "loading"}
              >
                <BsXLg /> Cerrar
              </button>
            </div>
          </form>
          {showPersonaModal && (
            <div className={styles.modalMain}>
              <div className={styles.modalContent}>
                <Persona onClose={closePersonaModal} isModal={true} />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
