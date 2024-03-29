import styles from "./form.module.css";

export default function Ticket() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <main className={styles.container}>
      <div className={styles.boxTitle}>
        <h2 className={styles.subtitle}>Tickets</h2>
      </div>
      <form className={styles.formChurch} onSubmit={handleSubmit}>
        <h3>Registro de Tickets</h3>
        <div className={styles.miembros_info_personal}>
          <label htmlFor="id_ticket">Número de ticket:</label>
          <input type="text" name="id_ticket" id="id_ticket" />
        </div>
        <div className={styles.miembros_info_personal}>
          <label htmlFor="person_id">Asignada a:</label>
          <select name="person_id" id="person_id">
            <option value="">Seleccione una opción</option>
            <option value="01">Reservado</option>
            <option value="02">Comprado</option>
            <option value="03">Utilizado</option>
          </select>
        </div>
        <div className={styles.miembros_info_personal}>
          <label htmlFor="id_event">Ticket:</label>
          <select name="id_event" id="id_event">
            <option value="">Seleccione una opción</option>
            <option value="01">Reservado</option>
            <option value="02">Comprado</option>
            <option value="03">Utilizado</option>
          </select>
        </div>
        <div className={styles.miembros_info_personal}>
          <label htmlFor="vendedor">Número de ticket:</label>
          <input type="text" name="vendedor" id="vendedor" />
        </div>
        <div className={styles.miembros_info_personal}>
          <label htmlFor="state_ticket">Ticket:</label>
          <select name="state_ticket" id="state_ticket">
            <option value="">Seleccione una opción</option>
            <option value="reservado">Reservado</option>
            <option value="comprado">Comprado</option>
            <option value="utilizado">Utilizado</option>
          </select>
        </div>

        <button>Registrar</button>
      </form>
    </main>
  );
}
