import styles from "./form.module.css";

export default function Church() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className={styles.container}>
      <div className={styles.boxTitle}>
        <h2 className={styles.subtitle}>Congregaciones</h2>
      </div>
      <form className={styles.formChurch} onSubmit={handleSubmit}>
        <h3>Registro de Congregaciones</h3>
        <div className={styles.miembros_info_personal}>
          <label htmlFor="name">Nombre de la congregación:</label>
          <input type="text" name="name" id="name" />
        </div>
        <div className={styles.miembros_info_personal}>
          <label htmlFor="state">Departamento:</label>
          <select name="state" id="state">
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
          </select>
        </div>
        <div className={styles.miembros_info_personal}>
          <label htmlFor="address">Dirección de la congregación</label>
          <input type="text" name="address" id="address" />
        </div>

        <div className={styles.miembros_info_personal}>
          <label htmlFor="phone">Teléfono de la congregación</label>
          <input type="text" name="phone" id="phone" />
        </div>
        <div>
          <button>Guardar datos</button>
          <button>Borrar datos del formulario</button>
        </div>
      </form>
    </main>
  );
}
