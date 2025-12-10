import styles from "./InputField.module.css";

type InputFieldProps = {
  text: string;
  id: string;
  width: number;
  onInput: (event: React.FormEvent<HTMLInputElement>) => void;
};

function InputField(props: InputFieldProps) {
  const style = {
    width: "100%",
    maxWidth: `${props.width}px`,
    minWidth: "120px",
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        required
        className={styles.field}
        id={props.id}
        placeholder={props.text}
        style={style}
        onInput={props.onInput}
      />
    </form>
  );
}

export { InputField };
