import styles from "./ButtonLarge.module.css";

type ButtonProps = {
  image: string;
  text: string;
  onClick: () => void;
};

function ButtonLarge(props: ButtonProps) {
  return (
    <button className={styles.button} onClick={props.onClick}>
      <img src={props.image} className={styles.image} />
      <span>{props.text}</span>
    </button>
  );
}

export { ButtonLarge };
