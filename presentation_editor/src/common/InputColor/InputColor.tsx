import styles from './InputColor.module.css';
import { useRef } from 'react';
import { ButtonSmall } from '../ButtonSmall/ButtonSmall';
import { useAppDispatch } from '../../store/hooks/reduxHooks';
import { commitToHistory } from '../../store/editorSlice';

type InputColorProps = {
  image: string;
  text: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
function InputColor(props: InputColorProps) {
  const dispatch = useAppDispatch()

  const colorInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    dispatch(commitToHistory())
    colorInputRef.current?.click();
  };

  return (
    <div>
      <input
        type="color"
        ref={colorInputRef}
        className={styles.input}
        onChange={props.onChange}
      />
      <ButtonSmall image={props.image} text={props.text} onClick={handleClick}></ButtonSmall>
    </div>
  );
}

export { InputColor };
