import { NavLink } from "react-router-dom";
import styles from "./PageNotFound.module.css";

export default function PageNotFound() {
  return (
    <main className={styles.notfound}>
      <div className={styles.img_NotFound}>
        <img src="/400-status-code.png" alt="imagen de pagina no encontrada" />
      </div>

      <NavLink to="/home">Go Home!</NavLink>
    </main>
  );
}
