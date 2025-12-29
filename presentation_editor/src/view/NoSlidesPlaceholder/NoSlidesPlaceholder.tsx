import styles from './NoSlidesPlaceholder.module.css';
import { createNewSlide } from '../../store/functions';
import { useAppDispatch } from '../../store/hooks/reduxHooks';
import { addSlide } from '../../store/editorSlice';

function NoSlidesPlaceholder() {
  const dispatch = useAppDispatch()
  
  const handleAddSlideClick = () => {
    dispatch(addSlide({newSlide: createNewSlide()}));
  };

  return (
    <div className={styles.noSlidesPlaceholder} onClick={handleAddSlideClick}>
      <p>Добавить слайд</p>
    </div>
  );
}

export { NoSlidesPlaceholder };
