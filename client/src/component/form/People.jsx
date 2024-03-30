import styles from "./form.module.css";
import PropTypes from "prop-types";

export default function People({ onClose, isModal }) {
  People.propTypes = {
    onClose: PropTypes.func.isRequired, // onClose debe ser una función y es requerida
    isModal: PropTypes.bool.isRequired, // isModal debe ser un booleano y es requerido
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isModal) {
      console.log("Valor de isModal en handleSubmit:", isModal);
      onClose(); // Cierra la modal al enviar el formulario
    }
  };

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
              <input type="text" name="person_id" id="person_id" />
            </div>

            <div>
              <label htmlFor="name">Nombre Completo:</label>
              <input type="text" name="name" id="name" />
            </div>
            <div>
              <label htmlFor="address">Dirección:</label>
              <input type="text" name="address" id="address" />
            </div>
            <div>
              <label htmlFor="phone">Nombre de teléfono/celular:</label>
              <input type="text" name="phone" id="phone" />
            </div>
            <div>
              <label htmlFor="genre">Género:</label>
              <select name="genre" id="genre">
                <option value="">Seleccione una opción</option>
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
              </select>
            </div>
            <div>
              <label htmlFor="churchId">Congregación:</label>
              <select name="churchId" id="churchId">
                <option value="">Seleccione una opción</option>
                <option value="01">Reservado</option>
                <option value="02">Comprado</option>
                <option value="03">Utilizado</option>
              </select>
            </div>

            <button type="submit" className={styles.btn_form} onClick={onClose}>
              {isModal ? "Guardar y cerrar" : "Registrar"}
            </button>

            <button type="button" className={styles.btn_form}>
              Limpiar datos
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
