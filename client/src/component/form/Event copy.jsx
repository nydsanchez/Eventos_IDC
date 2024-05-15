import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addDataEvent, getDataEvent } from "../../redux/actions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Header from "../header/Header";
import MenuGlobal from "../menu/MenuGlobal";
import validation from "../../assets/javascript/validation";
import styles from "./form.module.css";

export default function Event() {
  const [newData, setNewData] = useState({
    event_name: "",
    event_type: "",
    start_date: null,
    end_date: null,
    tickets: 0,
    description: "",
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.loading);
  const eventos = useSelector((state) => state.data.eventos);

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

  function delete_formData() {
    setNewData({
      event_name: "",
      event_type: "",
      start_date: null,
      end_date: null,
      tickets: 0,
      description: "",
    });
  }

  function handleClearData() {
    delete_formData();
  }

  // useEffect(() => {
  //   // Accediendo a propiedades específicas de newData
  //   const {
  //     event_name,
  //     event_type,
  //     start_date,
  //     end_date,
  //     tickets,
  //     description,
  //   } = newData;
  //   console.log("New value of event_name:", event_name);
  //   console.log("New value of event type:", event_type);
  //   console.log("New value of start date:", start_date);
  //   console.log("New value of end date:", end_date);
  //   console.log("New value of tickets:", tickets);
  //   console.log("New value of descr:", description);
  // }, [newData]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("Submitting newData:", newData);
  //   try {
  //     const response = await dispatch(addDataEvent(newData));
  //     await dispatch(getDataEvent());
  //     delete_formData();
  //     console.log("ES EL ESTADO GLOBAL:", eventos);
  //     // navigate("/");
  //   } catch (error) {
  //     console.warn("Error adding event:", error);
  //     // Manejar el error según sea necesario (mostrar un mensaje de error, etc.)
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para obtener los datos del formulario
    dispatch(addDataEvent(newData))
      .then(() => {
        dispatch(getDataEvent())
          .then(() => {
            delete_formData();
            console.log("ES EL ESTADO GLOBAL:", eventos);
            navigate("/");
          })
          .catch((error) => {
            console.warn("Error getting updated data:", error);
          });
      })
      .catch((error) => {
        console.warn("Error adding event:", error);
        // Manejar el error según sea necesario (mostrar un mensaje de error, etc.)
      });
  };

  return (
    <div className="app">
      <Header />
      <MenuGlobal />
      <main>
        <h2 className={styles.subtitle}>Eventos</h2>
        <div className={styles.grid_container}>
          <div className={styles.grid_container_text}>
            <h3>Registro de Eventos</h3>
            <p>
              Completa los datos de generales del evento para poder gestionar
              las tickets y asistencia del evento.
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
                  <option value="Taller">Taller</option>
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
                onClick={handleClearData}
                disabled={loading}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
