import React, { useState } from "react";
import { FaBuilding, FaUser, FaUsers } from "react-icons/fa"; // Import icons
import styles from "./ToggleButton.module.css";
import { useTranslation } from "react-i18next";

const ToggleButton = ({ isToggled, setIsToggled }: any) => {
  const handleToggle = () => {
    setIsToggled(!isToggled);
  };
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <label htmlFor="toggle" className={styles.label}>
        <h3 className="main-color fw-bold mb-0 me-3">{t("toggle.joinAs")}</h3>
        <input
          type="checkbox"
          id="toggle"
          className={styles.input}
          checked={isToggled}
          onChange={handleToggle}
        />
        <div className={styles.toggleWrapper}>
          <span className={styles.selector}>
            {isToggled ? (
              <FaUser className={styles.icon} size={20} />
            ) : (
              <FaBuilding className={styles.icon} size={20} />
            )}
          </span>
        </div>
      </label>
    </div>
  );
};

export default ToggleButton;
