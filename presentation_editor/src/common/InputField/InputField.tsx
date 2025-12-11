import styles from "./InputField.module.css";

type InputFieldProps = {
  text: string;
  id: string;
  onInput: (event: React.FormEvent<HTMLInputElement>) => void;
};

function InputField(props: InputFieldProps) {

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <input
        type="text"
        required
        className={styles.field}
        id={props.id}
        placeholder={props.text}
        onInput={props.onInput}
      />
    </form>
  );
}

export { InputField };
