import styles from "./form.module.css";

export default function People() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <main className={styles.container}>
      <div className={styles.boxTitle}>
        <h2 className={styles.subtitle}>Participantes</h2>
      </div>
      <form className={styles.formChurch} onSubmit={handleSubmit}>
        <h3>Registro de Participantes</h3>
        <div className={styles.miembros_info_personal}>
          <label htmlFor="person_id">Número de cedula:</label>
          <input type="text" name="person_id" id="person_id" />
        </div>

        <div className={styles.miembros_info_personal}>
          <label htmlFor="name">Nombre Completo</label>
          <input type="text" name="name" id="name" />
        </div>
        <div className={styles.miembros_info_personal}>
          <label htmlFor="name">Nombre de teléfono/celular:</label>
          <input type="text" name="name" id="name" />
        </div>
        <div className={styles.miembros_info_personal}>
          <label htmlFor="genre">Género:</label>
          <select name="genre" id="genre">
            <option value="">Seleccione una opción</option>
            <option value="Femenino">Femenino</option>
            <option value="Masculino">Masculino</option>
          </select>
        </div>
        <div className={styles.miembros_info_personal}>
          <label htmlFor="churchId">Congregación:</label>
          <select name="churchId" id="churchId">
            <option value="">Seleccione una opción</option>
            <option value="01">Reservado</option>
            <option value="02">Comprado</option>
            <option value="03">Utilizado</option>
          </select>
        </div>

        <button>Registrar</button>
      </form>
    </main>
  );
}
