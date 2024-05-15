import { useState } from "react";
import { useDispatch } from "react-redux";
import { addDataEvent } from "../../redux/actions";
import PropTypes from "prop-types";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./form.module.css";

export default function Event({ onClose }) {
  Event.propTypes = {
    onClose: PropTypes.func.isRequired, // onClose debe ser una función y es requerida
  };

  const [newData, setNewData] = useState({
    name: "",
    event_type: "",
    start_date: null,
    end_date: null,
    tickets: 0,
    description: "",
  });

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });
  };

  const handleDateChange = (date, field) => {
    setNewData({ ...newData, [field]: date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addDataEvent(newData));
    onClose();
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
                name="name"
                id="name"
                value={newData.name}
                onChange={handleChange}
              />
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
            </div>

            <div>
              <label htmlFor="start_date">Fecha de inicio:</label>
              <DatePicker
                className={styles.inputDate}
                selected={newData.start_date}
                onChange={(date) => handleDateChange(date, "start_date")}
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <div>
              <label htmlFor="end_date">Fecha de finalización:</label>
              <DatePicker
                className={styles.inputDate}
                selected={newData.end_date}
                onChange={(date) => handleDateChange(date, "end_date")}
                dateFormat="dd/MM/yyyy"
              />
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

            <button className={styles.btn_form}>Registrar evento</button>
          </form>
        </div>
      </div>
    </main>
  );
}
