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
                expandedMenu === 1 && styles.menu_active
              }`}
              onClick={() => handleToggle(1)}
            >
              Congregaciones
            </div>
            {expandedMenu === 1 && (
              <ul>
                <li className={styles.box_option}>
                  <NavLink to="/congregaciones" className={styles.submenu}>
                    Agregar Congregación
                  </NavLink>
                </li>
                <li className={styles.box_option}>
                  <NavLink to="/allchurch" className={styles.submenu}>
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
              Personas
            </div>
            {expandedMenu === 2 && (
              <ul>
                <li className={styles.box_option}>
                  <NavLink to="/participantes" className={styles.submenu}>
                    Agregar Personas
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
              Configuración
            </div>
            {expandedMenu === 3 && (
              <ul>
                <li className={styles.box_option}>
                  <NavLink
                    to="/configuracion/general"
                    className={styles.submenu}
                  >
                    Ajustes generales
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
