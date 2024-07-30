import { Link } from "react-router-dom";
import styles from "./PageNotFound.module.css";
import Footer from "../../components/footer/Footer";
import logo from "/Logo-Hor-BG-BCO.png";

const NotFound = () => {
  return (
    <div className={styles.notfound}>
      <header>
        <img src={logo} alt="Logo" className={styles.logo} />
        <h1 className={styles.titleP}>404 - PÁGINA NO ENCONTRADA</h1>
      </header>

      <main className={styles.textoPage}>
        <h2 className={styles.title}>¿TE PERDISTE DEL EVENTO?</h2>
        <p className={styles.message}>
          Parece que has tomado una ruta que aún no está en nuestro mapa. No te
          preocupes, en SC-EVENTS UNIVERSE cada desvío es una oportunidad para
          descubrir nuevos eventos. Regresa a la página inicio para conectarte
          con todos los eventos de nuestra plataforma.
        </p>
        <Link to="/home" className={styles.homeButton}>
          Volver a la página de inicio
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
