import styles from "./InputField.module.css";
import { useState, useEffect } from "react"

type InputFieldProps = {
  placeholder: string;
  value: string;
  onBlur: (value: string) => void;
};

function InputField(props: InputFieldProps) {

  const [localValue, setValue] = useState(props.value)

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  }

  const save = () => {
    props.onBlur(localValue)
  }

  return (
      <input
        type="text"
        required
        className={styles.field}
        placeholder={props.placeholder}
        value={localValue}
        onChange={handleChange}
        onBlur={save}
        onKeyDown={handleKeyDown}
        name={props.value}
      />
  );
}

export { InputField };
