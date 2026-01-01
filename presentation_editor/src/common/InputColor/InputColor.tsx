import {  createNewBackgroundColor } from '../../store/functions';
import styles from './InputColor.module.css';
import { useRef } from 'react';
import { ButtonSmall } from '../ButtonSmall/ButtonSmall';
import { useAppDispatch } from '../../store/hooks/reduxHooks';
import { changeBackground, commitToHistory } from '../../store/editorSlice';

type InputColorProps = {
  image: string;
  text: string;
};
function InputColor(props: InputColorProps) {
  const dispatch = useAppDispatch()

  const colorInputRef = useRef<HTMLInputElement>(null);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event?.target.value;
    dispatch(changeBackground({newBackground: createNewBackgroundColor(newColor)}));
  };
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
        onChange={handleColorChange}
      />
      <ButtonSmall image={props.image} text={props.text} onClick={handleClick}></ButtonSmall>
    </div>
  );
}

export { InputColor };
