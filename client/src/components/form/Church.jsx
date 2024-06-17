import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addDataChurch } from "../../features/church/churchSlice";
import MaskedInput from "react-text-mask";
import { BsFillFloppy2Fill, BsXLg } from "react-icons/bs";
import validation from "../../js/validation";

import styles from "./form.module.css";

export default function Church() {
  const [newData, setNewData] = useState({
    name: "",
    state: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const status = useSelector((state) => state.churches?.status);
  const error = useSelector((state) => state.churches?.error);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });
    const updatedErrors = validation({ ...newData, [name]: value });
    setErrors(updatedErrors);
  };

  function delete_formData() {
    setNewData({
      name: "",
      state: "",
      address: "",
      phone: "",
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addDataChurch(newData));
    if (status === "succeeded") {
      window.alert("Los datos se han guardado exitosamente");
      delete_formData();
    } else {
      window.alert(error);
    }
  };

  function handleClearData() {
    delete_formData();
  }

  return (
    <main>
      <div className={styles.grid_container_2col}>
        <div className={styles.grid_container_text}>
          <h3>Registro de Congregaciones</h3>
          <p>
            Completa los datos de la congregación para comenzar a gestionar a
            los participantes de las actividades.
          </p>

          <form className={styles.formChurch} onSubmit={handleSubmit}>
            <div className={styles.miembros_info_personal}>
              <label htmlFor="name">Nombre de la congregación:</label>
              <input
                type="text"
                name="name"
                id="name"
                value={newData.name}
                onChange={handleChange}
              />{" "}
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
                <option value="Rio San Juan">Río San Juan</option>
                <option value="RACCN">Región Autonoma del Caribe Norte</option>
                <option value="RACCS">Región Autonoma del Caribe Sur</option>
              </select>
            </div>
            <div className={styles.miembros_info_personal}>
              <label htmlFor="address">Dirección de la congregación</label>
              <input
                type="text"
                name="address"
                id="address"
                value={newData.address}
                onChange={handleChange}
              />{" "}
              {errors.e1 ? (
                <p className={styles.error_msg}>{errors.e1}</p>
              ) : (
                <p>&nbsp;</p>
              )}
            </div>

            <div className={styles.miembros_info_personal}>
              <label htmlFor="phone">Teléfono de la congregación</label>

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

              {errors.e1 ? (
                <p className={styles.error_msg}>{errors.e1}</p>
              ) : (
                <p>&nbsp;</p>
              )}
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
                onClick={handleClearData}
                disabled={status === "loading"}
              >
                <BsXLg /> Cerrar
              </button>
            </div>
          </form>
        </div>
        <div
          className={styles.grid_container_imgChurch}
          role="img"
          aria-label="foto de Iglesia de Cristo"
        ></div>
      </div>
    </main>
  );
}
