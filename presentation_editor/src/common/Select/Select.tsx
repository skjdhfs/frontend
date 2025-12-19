import styles from './Select.module.css';

function Select() {
  return (
    <select name="font" className={styles.select}>
      <option value="Arial">Arial</option>
      <option value="TimesNewRoman">Times New Roman</option>
      <option value="Calibri">Calibri</option>
      <option value="Georgia">Georgia</option>
      <option value="Verdana">Verdana</option>
      <option value="CourierNew">Courier New</option>
    </select>
  );
}

export { Select };
