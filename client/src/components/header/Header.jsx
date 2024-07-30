import Logo from "../logo/logo";
import styles from "./header.module.css";

const Header = () => {
  return (
    <header className={`${styles.header} ${styles.sticky}`}>
      <Logo />
      <div className={styles.headerText}>
        <h1>Encuentro de Predicadores </h1>
        <p>Iglesia de Cristo en Nicaragua | Evento presencial</p>
      </div>
      <div>
        <a
          href="https://www.sc-consulting.online"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className={styles.imgLogo2}
            src="/logoHeadName.png"
            alt="logo SC - Consulting"
          />
        </a>
      </div>
    </header>
  );
};
export default Header;
