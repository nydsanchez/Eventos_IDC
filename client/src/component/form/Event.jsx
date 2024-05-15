import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDataEvent } from "../../redux/actions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import PropTypes from "prop-types";
import validation from "../../assets/javascript/validation";
import styles from "./form.module.css";

export default function Event({ onClose }) {
  Event.propTypes = {
    onClose: PropTypes.func.isRequired, // onClose debe ser una función y es requerida
  };

  const [newData, setNewData] = useState({
    event_name: "",
    event_type: "",
    start_date: null,
    end_date: null,
    tickets: 0,
    description: "",
  });
  const [errors, setErrors] = useState({});
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });

    const updatedErrors = validation({ ...newData, [name]: value });
    setErrors(updatedErrors);
  };

  const handleDateChange = (date, field) => {
    setNewData({ ...newData, [field]: date });
    const updatedErrors = validation({ ...newData, [field]: date });
    setErrors(updatedErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addDataEvent(newData));
    onClose();
  };

  const handleCancel = () => {
    onClose(); // Cerramos la ventana modal al hacer clic en un botón de cancelar
  };

  return (
    <main className={styles.modalMain}>
      <h2 className={styles.subtitleModal}>Eventos</h2>

      <div className={styles.modalContent}>
        <div className={styles.grid_container_text}>
          <h3>Registro de Eventos</h3>
          <p>
            Completa los datos de generales del evento para poder gestionar las
            tickets y asistencia del evento.
          </p>
          <form className={styles.formChurch} onSubmit={handleSubmit}>
            <div className={styles.miembros_info_personal}>
              <label htmlFor="name">Nombre del evento</label>
              <input
                type="text"
                name="event_name"
                id="event_name"
                value={newData.event_name}
                onChange={handleChange}
              />
              {errors.e1 ? (
                <p className={styles.error_msg}>{errors.e1}</p>
              ) : (
                <p>&nbsp;</p>
              )}
            </div>

            <div>
              <label className={styles.mg_top} htmlFor="event_type">
                Tipo de evento:
              </label>

              <select
                name="event_type"
                id="event_type"
                value={newData.event_type}
                onChange={handleChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="Conferencia">Conferencia</option>
                <option value="Capacitación">Capacitación</option>
                <option value="Retiro">Retiro</option>
                <option value="Culto Unido">Culto Unido</option>
                <option value="Taller">Estelí</option>
                <option value="Confraternidad">Confraternidad</option>
                <option value="Otro">Otro</option>
              </select>
              {errors.e2 ? (
                <p className={styles.error_msg}>{errors.e2}</p>
              ) : (
                <p>&nbsp;</p>
              )}
            </div>

            <div>
              <label htmlFor="start_date">Fecha de inicio:</label>
              <DatePicker
                className={styles.inputDate}
                selected={newData.start_date}
                onChange={(date) => handleDateChange(date, "start_date")}
                dateFormat="dd/MM/yyyy"
              />
              {errors.e3 && <p className={styles.error_msg}>{errors.e3}</p>}
            </div>
            <div>
              <label htmlFor="end_date">Fecha de finalización:</label>
              <DatePicker
                className={styles.inputDate}
                selected={newData.end_date}
                onChange={(date) => handleDateChange(date, "end_date")}
                dateFormat="dd/MM/yyyy"
              />
              {errors.e4 && <p className={styles.error_msg}>{errors.e4}</p>}
            </div>

            <div>
              <label htmlFor="tickets">No. Cupos para el evento:</label>
              <input
                type="number"
                name="tickets"
                id="tickets"
                value={newData.tickets}
                onChange={handleChange}
              />
              {errors.e5 && <p className={styles.error_msg}>{errors.e5}</p>}
            </div>
            <div className={styles.miembros_info_personal}>
              <label htmlFor="description">Descripción del evento:</label>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="5"
                value={newData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <button className={styles.btn_form} disabled={loading}>
              {loading ? "Enviando..." : "Registrar"}
            </button>
            <button
              className={styles.btn_form}
              disabled={loading}
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
