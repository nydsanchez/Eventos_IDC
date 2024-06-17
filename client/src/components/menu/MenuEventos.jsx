import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  BsSpeedometer2,
  BsHospital,
  BsPerson,
  BsTicketPerforated,
  BsJournalCheck,
} from "react-icons/bs";
import styles from "./menu.module.css";

const Menu = () => {
  const [expandedMenu, setExpandedMenu] = useState(null);

  const handleToggle = (index) => {
    if (expandedMenu === index) {
      setExpandedMenu(null);
    } else {
      setExpandedMenu(index);
    }
  };

  return (
    <div className={`${styles.asideMenu} ${styles.sticky}`}>
      <nav>
        <ul>
          <li>
            <div
              className={`${styles.menu} ${
                expandedMenu === 6 && styles.menu_active
              }`}
              onClick={() => handleToggle(6)}
            >
              <NavLink to="/home">
                <BsSpeedometer2 className={styles.iconosMenu} /> Dashboard
              </NavLink>
            </div>
          </li>

          <li>
            <div
              className={`${styles.menu} ${
                expandedMenu === 1 && styles.menu_active
              }`}
              onClick={() => handleToggle(1)}
            >
              <BsHospital className={styles.iconosMenu} /> Congregaciones
            </div>
            {expandedMenu === 1 && (
              <ul className={styles.box_option}>
                <li>
                  <NavLink to="/iglesia/nuevo" className={styles.submenu}>
                    Nueva Congregación
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/iglesia/listado" className={styles.submenu}>
                    Ver Congregaciones
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li>
            <div
              className={`${styles.menu} ${
                expandedMenu === 2 && styles.menu_active
              }`}
              onClick={() => handleToggle(2)}
            >
              <BsPerson className={styles.iconosMenu} /> Personas
            </div>
            {expandedMenu === 2 && (
              <ul>
                <li className={styles.box_option}>
                  <NavLink to="/personas" className={styles.submenu}>
                    Registro de Personas
                  </NavLink>
                </li>
                <li className={styles.box_option}>
                  <NavLink to="/personas/listado" className={styles.submenu}>
                    Consultar Personas
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li>
            <div
              className={`${styles.menu} ${
                expandedMenu === 3 && styles.menu_active
              }`}
              onClick={() => handleToggle(3)}
            >
              <BsTicketPerforated className={styles.iconosMenu} /> Tickets
            </div>
            {expandedMenu === 3 && (
              <ul>
                <li className={styles.box_option}>
                  <NavLink to="/tickets" className={styles.submenu}>
                    Registro de tickets
                  </NavLink>
                </li>
                <li className={styles.box_option}>
                  <NavLink to="/tickets/listado" className={styles.submenu}>
                    Consultar tickets
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li>
            <div
              className={`${styles.menu} ${
                expandedMenu === 4 && styles.menu_active
              }`}
              onClick={() => handleToggle(4)}
            >
              <BsJournalCheck className={styles.iconosMenu} /> Asistencia
            </div>
            {expandedMenu === 4 && (
              <ul>
                <li className={styles.box_option}>
                  <NavLink to="/asistencias" className={styles.submenu}>
                    Registro de Asistencia
                  </NavLink>
                </li>
                <li className={styles.box_option}>
                  <NavLink
                    to="/listado-de-asistencia"
                    className={styles.submenu}
                  >
                    Consultar Asistencia
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
