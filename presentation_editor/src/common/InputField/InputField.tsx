import styles from './InputField.module.css';

type InputFieldProps = {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
};

function InputField(props: InputFieldProps) {

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur();
    }
  };

  return (
    <input
      type="text"
      required
      className={styles.field}
      placeholder={props.placeholder}
      value={props.value}
      onBlur={props.onBlur}
      onChange={props.onChange}
      onKeyDown={handleKeyDown}
      name={props.value}
    />
  );
}

export { InputField };
