import { useState } from "react";
import { NavLink } from "react-router-dom";

import styles from "./menu.module.css";
import { FaAlignJustify, FaX } from "react-icons/fa6";

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
      <div>
        <button className={`${styles.btn_mobile_nav}  `}>
          <FaAlignJustify className={styles.icon_mobile} />
        </button>
        <button
          className={`${styles.btn_mobile_nav} ${styles.btn_mobile_nav_hidden} `}
        >
          <FaX className={styles.icon_mobile} />
        </button>
      </div>

      <nav>
        <ul>
          <li>
            <div
              className={`${styles.menu} ${
                expandedMenu === 6 && styles.menu_active
              }`}
              onClick={() => handleToggle(6)}
            >
              <NavLink to="/eventos/dashboard">Dashboard</NavLink>
            </div>
          </li>
          <li>
            <div
              className={`${styles.menu} ${
                expandedMenu === 1 && styles.menu_active
              }`}
              onClick={() => handleToggle(1)}
            >
              Evento
            </div>
            {expandedMenu === 1 && (
              <ul className={styles.box_option}>
                <li>
                  <NavLink to="/eventos/detalle" className={styles.submenu}>
                    Consultar Eventos
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
              Ticket
            </div>
            {expandedMenu === 3 && (
              <ul>
                <li className={styles.box_option}>
                  <NavLink to="/eventos/tickets" className={styles.submenu}>
                    Registro de Ticket
                  </NavLink>
                </li>
                <li className={styles.box_option}>
                  <NavLink to="/tickets-status" className={styles.submenu}>
                    Consultar Tickets
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li>
            <div
              className={`${styles.menu} ${
                expandedMenu === 5 && styles.menu_active
              }`}
              onClick={() => handleToggle(5)}
            >
              Asistencia
            </div>
            {expandedMenu === 5 && (
              <ul>
                <li className={styles.box_option}>
                  <NavLink
                    to="/eventos/registro-asistencia"
                    className={styles.submenu}
                  >
                    Registro de Asistencia
                  </NavLink>
                </li>
                <li className={styles.box_option}>
                  <NavLink
                    to="/eventos/consultar-asistencia"
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
