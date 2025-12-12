import { changeBackground, createNewBackgroundColor } from '../../store/functions';
import { dispatch } from '../../store/editor';
import styles from './InputColor.module.css'
import { useRef } from 'react';
import { ButtonSmall } from '../ButtonSmall/ButtonSmall';

type InputColorProps = {
    image: string;
    text: string;
}
function InputColor(props: InputColorProps) {
    const colorInputRef = useRef<HTMLInputElement>(null);

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newColor = event?.target.value
        dispatch(changeBackground, {newBackground: createNewBackgroundColor(newColor)})
    }
    const handleClick = () => {
        colorInputRef.current?.click();
    }

    return(
        <div>
            <input 
                type="color"
                ref={colorInputRef}
                className={styles.input}
                onChange={handleColorChange}
            />
            <ButtonSmall
                image={props.image}
                text={props.text}
                onClick={handleClick}>
            </ButtonSmall>
        </div>
    )
}

export {InputColor}