import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addDataPeople } from "../../features/people/peopleSlice";
import { BsFillFloppy2Fill, BsXLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import MaskedInput from "react-text-mask";
import PropTypes from "prop-types";
import SelectChurch from "../select/selectChurch";
import validation from "../../js/validation";
import styles from "./peopleform.module.css";

export default function People({ onClose, isModal }) {
  People.propTypes = {
    onClose: PropTypes.func.isRequired, // onClose debe ser una función y es requerida
    isModal: PropTypes.bool.isRequired, // isModal debe ser un booleano y es requerido
  };

  const [newData, setNewData] = useState({
    person_id: "",
    name: "",
    state: "",
    address: "",
    phone: "",
    genre: "",
    ChurchId: "",
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.people?.error);
  const status = useSelector((state) => state.people?.status);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });
    const updatedErrors = validation({ ...newData, [name]: value });
    setErrors(updatedErrors);
  };

  const handleSelectChurchChange = (id) => {
    setNewData({ ...newData, ChurchId: id });
  };

  function delete_formData() {
    setNewData({
      person_id: "",
      name: "",
      state: "",
      address: "",
      phone: "",
      genre: "",
      ChurchId: "",
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addDataPeople(newData));
    if (error === null) {
      window.alert("Se ha guardado los datos exitosamente");
      if (isModal) {
        onClose(); // Cierra la modal al enviar el formulario
      }

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
    <main className={isModal ? styles.modalMain : ""}>
      <div className={isModal ? styles.modalContent : styles.grid_container}>
        <div className={styles.grid_container_text}>
          <h3>Registro de Personas</h3>

          <form className={styles.peopleform} onSubmit={handleSubmit}>
            <div>
              <label htmlFor="person_id">Número de cedula:</label>

              <MaskedInput
                mask={[
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  /[A-Za-z]/,
                ]}
                guide={false}
                value={newData.person_id}
                onChange={handleChange}
                name="person_id"
                id="person_id"
                placeholder="123-456789-0123A"
              />
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
            <div className={styles.miembros_info_personal}>
              <label htmlFor="state">Departamento:</label>
              <select
                name="state"
                id="state"
                value={newData.state}
                onChange={handleChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="Boaco">Boaco</option>
                <option value="Carazo">Carazo</option>
                <option value="Chinandega">Chinandega</option>
                <option value="Chontales">Chontales</option>
                <option value="Esteli">Estelí</option>
                <option value="Granada">Granada</option>
                <option value="Jinotega">Jinotega</option>
                <option value="Leon">León</option>
                <option value="Madriz">Madriz</option>
                <option value="Managua">Managua</option>
                <option value="Masaya">Masaya</option>
                <option value="Matagalpa">Matagalpa</option>
                <option value="Nueva Segovia">Nueva Segovia</option>
                <option value="Rivas">Rivas</option>
                <option value="Río San Juan">Río San Juan</option>
                <option value="RACCN">Región Autonoma del Caribe Norte</option>
                <option value="RACCS">Región Autonoma del Caribe Sur</option>
              </select>
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
            </div>
            <div>
              <label htmlFor="phone">No. Teléfono/celular:</label>

              <MaskedInput
                mask={[
                  "(",
                  /\d/,
                  /\d/,
                  /\d/,
                  ")",
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ]}
                guide={false}
                value={newData.phone}
                onChange={handleChange}
                name="phone"
                id="phone"
                placeholder="(505)-9999-9999"
              />
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
            </div>
            <div>
              <label htmlFor="ChurchId">Congregación:</label>
              <SelectChurch
                selectedChurchId={newData.ChurchId}
                onChange={handleSelectChurchChange}
              />
            </div>
            <div className={styles.formButton}>
              <button
                type="submit"
                className={styles.btn_form}
                disabled={status === "loading"}
                onClick={onClose}
              >
                {isModal ? (
                  "Guardar y cerrar"
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
                  handleClearData(); // Llama a handleClearData después de confirmar
                }}
                disabled={status === "loading"}
              >
                <BsXLg /> Cerrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
