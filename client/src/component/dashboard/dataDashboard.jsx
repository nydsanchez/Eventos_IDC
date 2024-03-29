import styles from "./dashboard.module.css";

const dataDashboard = ({ elemento }) => {
  return (
    <div className={styles.card}>
      <div className={styles.headerCard}>
        <h3>{elemento.desc}</h3>
      </div>
      <div className={styles.bodyCard}>
        <span className={styles.bigText}>{elemento.cantidad}</span>
      </div>
    </div>
  );
};
export default dataDashboard;
