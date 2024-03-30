import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../../redux/actions";

import Select from "../select/Select";

import validation from "../../assets/javascript/validation";
import styles from "./form.module.css";
import PropTypes from "prop-types";

export default function People({ onClose, isModal }) {
  People.propTypes = {
    onClose: PropTypes.func.isRequired, // onClose debe ser una función y es requerida
    isModal: PropTypes.bool.isRequired, // isModal debe ser un booleano y es requerido
  };

  const [newData, setNewData] = useState({
    person_id: "",
    name: "",
    address: "",
    phone: "",
    genre: "",
    ChurchId: "",
  });
  const [errors, setErrors] = useState({});
  const [confirmClear, setConfirmClear] = useState(false);

  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });

    const updatedErrors = validation({ ...newData, [name]: value });
    setErrors(updatedErrors);
  };

  function delete_formData() {
    setNewData({
      person_id: "",
      name: "",
      address: "",
      phone: "",
      genre: "",
      ChurchId: "",
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addData("people", newData));
    if (isModal) {
      onClose(); // Cierra la modal al enviar el formulario
    }
    delete_formData();
  };

  function handleClearData() {
    if (confirmClear) {
      // Solo limpiar si la confirmación es verdadera
      delete_formData();
      setConfirmClear(false); // Restablecer la confirmación después de limpiar los datos
    }
  }

  function showConfirmation() {
    if (confirmClear) {
      return window.confirm("¿Estás seguro de que quieres limpiar los datos?");
    }
    return true; // Si la confirmación no se ha mostrado todavía, siempre regresa true
  }

  return (
    <main className={isModal ? styles.modalMain : ""}>
      <h2 className={isModal ? styles.subtitleModal : styles.subtitle}>
        Participantes
      </h2>
      <div className={isModal ? styles.modalContent : styles.grid_container}>
        <div className={styles.grid_container_text}>
          <h3>Registro de Participantes</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            rerum odio maxime fuga nam voluptatum aspernatur adipisci quas
            incidunt animi!
          </p>
          <form className={styles.formChurch} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="person_id">Número de cedula:</label>
              <input
                type="text"
                name="person_id"
                id="person_id"
                value={newData.person_id}
                onChange={handleChange}
              />
              {errors.e1 ? (
                <p className={styles.error_msg}>{errors.e1}</p>
              ) : (
                <p>&nbsp;</p>
              )}
            </div>

            <div>
              <label htmlFor="name">Nombre Completo:</label>
              <input
                type="text"
                name="name"
                id="name"
                value={newData.name}
                onChange={handleChange}
              />
              {errors.e1 ? (
                <p className={styles.error_msg}>{errors.e1}</p>
              ) : (
                <p>&nbsp;</p>
              )}
            </div>
            <div>
              <label htmlFor="address">Dirección:</label>
              <input
                type="text"
                name="address"
                id="address"
                value={newData.address}
                onChange={handleChange}
              />
              {errors.e1 ? (
                <p className={styles.error_msg}>{errors.e1}</p>
              ) : (
                <p>&nbsp;</p>
              )}
            </div>
            <div>
              <label htmlFor="phone">Nombre de teléfono/celular:</label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={newData.phone}
                onChange={handleChange}
              />
              {errors.e1 ? (
                <p className={styles.error_msg}>{errors.e1}</p>
              ) : (
                <p>&nbsp;</p>
              )}
            </div>
            <div>
              <label htmlFor="genre">Género:</label>
              <select
                name="genre"
                id="genre"
                value={newData.genre}
                onChange={handleChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
              </select>
              {errors.e1 ? (
                <p className={styles.error_msg}>{errors.e1}</p>
              ) : (
                <p>&nbsp;</p>
              )}
            </div>
            <div>
              <label htmlFor="ChurchId">Congregación:</label>

              <Select
                name="ChurchId"
                id="ChurchId"
                value={newData.ChurchId}
                onChange={handleChange}
                idKey="id"
                nameKey="church_name"
              />

              {errors.e1 ? (
                <p className={styles.error_msg}>{errors.e1}</p>
              ) : (
                <p>&nbsp;</p>
              )}
            </div>

            <button
              type="submit"
              className={styles.btn_form}
              disabled={loading}
              onClick={onClose}
            >
              {isModal ? "Guardar y cerrar" : "Registrar"}
            </button>
            <button
              type="button"
              className={styles.btn_form}
              onClick={() => {
                if (showConfirmation()) {
                  setConfirmClear(true);
                  handleClearData(); // Llama a handleClearData después de confirmar
                }
              }}
              disabled={loading}
            >
              Limpiar datos
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
