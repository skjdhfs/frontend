import styles from './Select.module.css';
type SelectProps = {
  name: string;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

function Select(props: SelectProps) {
  const {
    name,
    value,
    options,
    onChange,
  } = props
  return (
    <select name={name} value={value} className={styles.select} onChange={onChange}>
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );
}

export { Select };
