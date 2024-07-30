import styles from "./Footer.module.css";
import { BsLinkedin, BsGithub, BsTwitterX } from "react-icons/bs";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; Copyright {new Date().getFullYear()}{" "}
        <a
          href="https://www.sc-consulting.online/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Nydia Massiel Sánchez | SC-Consulting.
        </a>{" "}
        Todos los derechos reservados.
      </p>
      <nav className={styles.rrss}>
        <ul>
          <li className={styles.rrss_item}>
            <a
              href="https://www.linkedin.com/in/nydia-massiel-sanchez-16318393/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.rrss_link}
            >
              <BsLinkedin className={styles.rrssIco} />
            </a>
          </li>
          <li className={styles.rrss_item}>
            <a
              href="https://github.com/nydsanchez"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.rrss_link}
            >
              <BsGithub className={styles.rrssIco} />
            </a>
          </li>
          <li className={styles.rrss_item}>
            <a
              href="https://x.com/sanchezc2023"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.rrss_link}
            >
              <BsTwitterX className={styles.rrssIco} />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
