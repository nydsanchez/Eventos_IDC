import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../../redux/actions";

import validation from "../../assets/javascript/validation";
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
  //const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading);

  /* useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]); */

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
    dispatch(addData("churches", newData));
    delete_formData();
  };

  function handleClearData() {
    delete_formData();
  }

  return (
    <main>
      <h2 className={styles.subtitle}>Congregaciones</h2>
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
                <option value="Boaco">Managua</option>
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
              </select>{" "}
              {errors.e1 ? (
                <p className={styles.error_msg}>{errors.e1}</p>
              ) : (
                <p>&nbsp;</p>
              )}
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
              <input
                type="text"
                name="phone"
                id="phone"
                value={newData.phone}
                onChange={handleChange}
              />{" "}
              {errors.e1 ? (
                <p className={styles.error_msg}>{errors.e1}</p>
              ) : (
                <p>&nbsp;</p>
              )}
            </div>

            <button className={styles.btn_form} disabled={loading}>
              {loading ? "Enviando..." : "Registrar"}
            </button>
            <button
              className={styles.btn_form}
              onClick={handleClearData}
              disabled={loading}
            >
              Limpiar datos
            </button>
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
